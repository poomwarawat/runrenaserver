module.exports = (eventData, eventReport) => {
  let data = eventData;
  let report = eventReport;
  const today = new Date();
  let table = "";
  let price = {
    funrun: eventReport[0]["funrun_price"],
    mini: eventReport[0]["mini_price"],
    half: eventReport[0]["half_price"],
    marathon: eventReport[0]["marathon_price"],
  };
  let priceData = Object.values(price);
  let priceHtml = "";
  let priceHtmlTag = [
    `<span class="badge badge-primary ml-2">Funrun :`,
    `<span class="badge badge-success ml-2">Mini Marathon :`,
    `<span class="badge badge-danger ml-2">Half Marathon :`,
    `<span class="badge badge-warning ml-2">Marathon :`,
  ];

  let countTag = 0;
  priceData.forEach((price) => {
    if (price > -1) {
      priceHtml = priceHtml + priceHtmlTag[countTag] + price;
      priceHtml = priceHtml + ` THB</span>`;
    } else {
      priceHtml = priceHtml + "";
    }
    countTag = countTag + 1;
  });
  let count = 0;
  let date = report[0]["event_date"].toString();
  date = date.slice(0, 16);
  data.forEach((event) => {
    count = count + 1;
    if (count % 26 === 0) {
      table =
        table +
        `<tr>
      <td>${event.bib_number}</td>
      <td>${event.firstname}</td>
      <td>${event.lastname}</td>
      <td>${event.email}</td>
      <td>${event.userId}</td>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tr>`;
    } else {
      table =
        table +
        `<tr>
      <td>${event.bib_number}</td>
      <td>${event.firstname}</td>
      <td>${event.lastname}</td>
      <td>${event.email}</td>
      <td>${event.userId}</td>
      </tr>`;
    }
  });
  return `
  <!doctype html>
  <html>
    <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <style>
        .report-box {
          max-width: 900px;
          margin: auto;
          padding: 30px;
          font-size: 16px;
          line-height: 15px;
          font-family: 'Helvetica Neue', 'Helvetica',
          color: #555;
          }
        </style>
    </head>
    <body>
    <div class="report-box">
        <h1 class="text-center">Runrena Event Report</h1>
        <div class="alert alert-primary" role="alert">
          <h4>Event ID : ${report[0]["eventId"]} </h4>
          <h5>${report[0]["title"]}</h5>
        </div>
        <h5>Event Date : <span class="badge badge-secondary">${date}</span></h5>
        <h5>Price : ${priceHtml}
        </h5>
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">BIB_NUMBER</th>
                <th scope="col">FIRST NAME</th>
                <th scope="col">LAST NAME</th>
                <th scope="col">E-MAIL</th>
                <th scope="col">USER ID</th>
              </tr>
            </thead>
            <tbody>
            ${table}
            </tbody>
      </table>
    </div>
    </body>
  </html>
  `;
};
