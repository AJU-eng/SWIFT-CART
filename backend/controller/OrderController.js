const jwt = require("jsonwebtoken");
const OrderModel = require("../model/OrderModel");
const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");
const razorpay = require("razorpay");
const crypto = require("crypto");
const AddressModel = require("../model/AddressModel");
const userModel = require("../model/userModel");
const easyinvoice = require("easyinvoice");
const nodemailer = require("nodemailer");
const pdfmake = require("pdfmake");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const WalletModel = require("../model/WalletModel");

require("dotenv").config();
const makeOrder = async (req, res) => {
  //   console.log(req.body);
  res.send(req.body);
};

const onlinePayment = async (req, res) => {
  console.log(req.body);
  try {
    const { amount } = req.body;
    const instance = new razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const options = {
      amount: amount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ order });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const paymentVerify = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      res.status(200).send("payment Verified");
    }
  } catch (error) {
    console.log(error);
  }
};

const PlaceOrder = async (req, res) => {
  const items = req.body.products.products;
  // console.log(req.body);

  // // console.log(req.body.products.totalPrice);
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  let { products, paymentMode, AdressMail } = req.body;
  products.paymentMode = paymentMode;
  if (paymentMode === "wallet") {
    const date = new Date();
    const _id = new Date().getTime();
    let obj = {
      amount: req.body.products.totalPrice,
      type: "debit",
      Description: "product ordered",
      Date: date,
      id: _id,
    };
    const dataAvailable = await WalletModel.findOne({ userId: user_id });
    if (dataAvailable) {
      // const price=parseFloat()
      const data = await WalletModel.findOneAndUpdate(
        { userId: user_id },
        {
          $push: { wallet: obj },
          $inc: { Balance: -req.body.products.totalPrice },
        }
      );
      // console.log(data);
    }
  }
  // console.log(products);
  const dates = new Date();
  let dateOnly = dates.toISOString().split("T")[0];
  // console.log(dateOnly);
  const specific = await ProductModel.findOne({ name: products.productName });
  // console.log(specific);
  products.products.map(async (product) => {
    // console.log(-product.quantity);

    const stockManage = await ProductModel.findOneAndUpdate(
      { name: product.productName },
      { $inc: { stock: -product.quantity } },
      { new: true }
    );
    // console.log(stockManage);
  });

  const userData = await OrderModel.findOne({ userId: user_id });
  if (userData) {
    let obj1 = {};
    let date = new Date();
    let dateOnly = dates.toISOString().split("T")[0];
    const addres = await AddressModel.findOne({ userId: user_id });
    addres.Address.map((adress) => {
      if (adress.email === AdressMail) {
        obj1 = adress;
      }
    });
    products.OrderedAt = dateOnly;
    products.Address = obj1;
    const id = new Date().getTime();
    products.OrderId = id;
    const updateData = await OrderModel.findOneAndUpdate(
      { userId: user_id },
      { $push: { orders: products } },
      { new: true }
    );
    const userEmail = await userModel.findOne({ _id: user_id });
    // console.log(userEmail.email);
    const datas = {
      // If not using the free version, set your API key
      // "apiKey": "123abc", // Get apiKey through: https://app.budgetinvoice.com/register

      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        background: "https://public.budgetinvoice.com/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // Your recipient
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: date.toISOString().split("T")[0],
        // Invoice due date
        "due-date": "31-12-2021",
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [],

      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // Settings to customize your invoice
      settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
      },
    };
    items.map((item) => {
      // b.push(item)
      delete item.productImage;
      delete item._id;
      item["description"] = item["productName"];
      item["price"] = item["Price"];
      delete item["productName"];
      delete item["Price"];
      item["tax-rate"] = 10;
      // console.log(item);
      datas.products.push(item);
    });

    console.log(updateData);
    // res.send(req.body)
    const result = await easyinvoice.createInvoice(datas);
    // console.log(result.pdf);

    const Transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const pdfBuffer = Buffer.from(result.pdf, "base64");

    const sendMail = await Transport.sendMail({
      from: "swiftcart027@gmail.com",
      to: userEmail.email,
      subject: "Welcome to SwiftCart", // Subject line
      text: `Invoice`, // plain text body
      html: `<b>Your Invoice is here</b>`,
      attachments: [
        {
          filename: `Invoice.pdf`,
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    });
    // console.log("hello world");
    // console.log(sendMail);

    const deleteFromCart = await CartModel.findOneAndDelete(
      { userId: user_id },
      { new: true }
    );
    console.log(updateData);
    res.send(req.body);
  } else {
    let obj = {};
    let date = new Date();
    let dateOnly = date.toISOString().split("T")[0];
    const address = await AddressModel.findOne({ userId: user_id });
    address.Address.map((adres) => {
      if (adres.email === AdressMail) {
        // console.log(adres);
        obj = adres;
      }
    });
    products.Address = obj;
    products.OrderedAt = dateOnly;
    const id = new Date().getTime();
    products.OrderId = id;
    // console.log(products.Address);
    const data = await OrderModel.create({
      userId: user_id,
      orders: products,
    });

    const userEmail = await userModel.findOne({ _id: user_id });
    // console.log(userEmail.email);
    const datas = {
      // If not using the free version, set your API key
      // "apiKey": "123abc", // Get apiKey through: https://app.budgetinvoice.com/register

      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        background: "https://public.budgetinvoice.com/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // Your recipient
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: date.toISOString().split("T")[0],
        // Invoice due date
        "due-date": "31-12-2021",
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [],

      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // Settings to customize your invoice
      settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
      },
    };
    items.map((item) => {
      // b.push(item)
      delete item.productImage;
      delete item._id;
      item["description"] = item["productName"];
      item["price"] = item["Price"];
      delete item["productName"];
      delete item["Price"];
      item["tax-rate"] = 10;
      // console.log(item);
      datas.products.push(item);
    });

    // console.log(datas);

    const result = await easyinvoice.createInvoice(datas);
    // console.log(result.pdf);

    const Transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const pdfBuffer = Buffer.from(result.pdf, "base64");

    const sendMail = await Transport.sendMail({
      from: "swiftcart027@gmail.com",
      to: userEmail.email,
      subject: "Welcome to SwiftCart", // Subject line
      text: `Invoice`, // plain text body
      html: `<b>Your Invoice is here</b>`,
      attachments: [
        {
          filename: `Invoice.pdf`,
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    });
    console.log("hello world");
    // console.log(sendMail);

    // invoice;
    const cartDelete = await CartModel.findOneAndDelete(
      { userId: user_id },
      { new: true }
    );
    console.log(data);
    // res.send(cartDelete.Products);
    res.send(req.body)
  }
};

const getOrder = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  const Orders = await OrderModel.findOne({ userId: user_id });
  if (Orders) {
    res.send(Orders.orders);
  }
};

const getAdminOrders = async (req, res) => {
  const Orders = await OrderModel.find();
  res.send(Orders);
};

const updateOrderStatus = async (req, res) => {
  console.log(req.body);
  const { price, status } = req.body;
  const data = await OrderModel.findOneAndUpdate(
    { "orders.totalPrice": price },
    { $set: { "orders.$.status": status } },
    { new: true, multi: true }
  );

  console.log(data);
};

const cancelOrder = async (req, res) => {
  const { price } = req.body;
  const status = await OrderModel.findOneAndUpdate(
    { "orders.totalPrice": price },
    { $set: { "orders.$.status": "cancelled" } },
    { new: true }
  );
  console.log(status);
  res.send(status.orders);
  // const status=await OrderModel.findOne({"products.totalPrice":price})
};

const orderHistory = async (req, res) => {
  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  console.log(user_id);
  const pendingData = await OrderModel.aggregate([
    { $unwind: "$orders" },
    { $match: { "orders.status": "Delivered" } },
  ]);

  console.log(pendingData.length);
  res.send(pendingData);
};

///Sales report
const salesReport = async (req, res) => {
  const today = new Date();

  // Start of the current week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const data = await OrderModel.aggregate([
    { $unwind: "$orders" },
    { $unwind: "$orders.products" },
    {
      $match: {
        "orders.OrderedAt": { $gte: startOfWeek.toISOString() },
      },
    },
    {
      $group: {
        _id: "$orders.products.productName",
        totalSales: {
          $sum: {
            $toDouble: "$orders.products.Price", // Assuming Price is a numeric field
          },
        },
      },
    },
    {
      $project: {
        product: "$_id",
        totalSales: 1,
        _id: 0,
      },
    },
  ]);

  console.log(data);
  res.send(data);
};

const monthly_sales = async (req, res) => {
  const today = new Date();

  // Start of the current month
  var startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const data = await OrderModel.aggregate([
    {
      $unwind: "$orders",
    },
    {
      $unwind: "$orders.products",
    },
    {
      $match: {
        "orders.OrderedAt": { $gte: startOfMonth.toISOString() },
      },
    },
    {
      $group: {
        _id: "$orders.products.productName",
        totalSales: {
          $sum: "$orders.products.Price",
        },
      },
    },
    {
      $project: {
        product: "$_id",
        totalSales: 1,
        _id: 0,
      },
    },
  ]);

  res.send(data);
  console.log(data);
};
const yearlySales = async (req, res) => {
  var today = new Date();

  // Start of the current year
  var startOfYear = new Date(today.getFullYear(), 0, 1);

  const data = await OrderModel.aggregate([
    {
      $unwind: "$orders",
    },
    {
      $unwind: "$orders.products",
    },
    {
      $match: {
        "orders.OrderedAt": { $gte: startOfYear.toISOString() },
      },
    },
    {
      $group: {
        _id: "$orders.products.productName",
        totalSales: {
          $sum: "$orders.products.Price",
        },
      },
    },
    {
      $project: {
        product: "$_id",
        totalSales: 1,
        _id: 0,
      },
    },
  ]);
  res.send(data);
  console.log(data);
};

const report = async (req, res) => {
  const { date } = req.body;
  const data = await OrderModel.aggregate([
    { $unwind: "$orders" },
    { $match: { "orders.OrderedAt": `${date}` } },
  ]);
  // const data = await OrderModel.aggregate([
  //   { $unwind: "$orders" },
  //   { $match: { "orders.OrderedAt": { $gte: new Date(date), $lt: new Date(date + "T23:59:59.999Z") } } },
  // ]);
  console.log(data);
  res.send(data);
};

const singleOrder = async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  const data = await OrderModel.aggregate([
    { $unwind: "$orders" },
    { $match: { "orders.OrderId": parseInt(_id) } },
  ]);
  res.send(data);
  console.log(data);
};
module.exports = {
  makeOrder,
  PlaceOrder,
  getOrder,
  getAdminOrders,
  updateOrderStatus,
  cancelOrder,
  orderHistory,
  onlinePayment,
  paymentVerify,
  salesReport,
  monthly_sales,
  yearlySales,
  report,
  singleOrder,
};
