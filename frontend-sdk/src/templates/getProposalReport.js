const getProposalReport = (data) => {
  const dateFormat = (date) => {
    return (
      date.split("T")[0].split("-").reverse().join("-") +
      " " +
      date.split("T")[1].split(".")[0]
    );
  };

  return `
    <body style="width: 21cm; height: 29.7cm;  display: block; font-family: Inter, sans-serif;">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet">
      <table style="width: 100%; background: #eeeeee; padding: 10px;">
          <tr>
              <td style="text-align: left; padding: 10px;">
                  <h1 style="line-height: 1rem;">Event Proposal Report</h1>
                  <h2 style="line-height: 1rem; font-weight: 500;">${
                    data.user
                  }</h2>
              </td>
              <td style="width: 120; text-align: right;">
                  <img width="80"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png" />
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr style="margin: 0">
              <td style="width: 25%; padding: 10px;">
                  <b>Event Name</b>
              </td>
              <td style="width: 25%; padding: 10px; ">
                  <p class="">${data.eventName}</p>
              </td>
              <td style="width: 25%; padding: 10px;">
                  <b>Event Proposal Date</b>
              </td>
              <td style="width: 25%; padding: 10px;">
                  <p class="">${data.createdAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}</p>
              </td>
          </tr>
          <tr style="margin: 0">
              <td style="width: 25%; padding: 10px;">
                  <b>Event Start Date</b>
              </td>
              <td style="width: 25%; padding: 10px; ">

                  <p class="">${
                    data.startDate
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-") +
                    " " +
                    data.startDate.split("T")[1].split(".")[0]
                  }</p>
              </td>
              <td style="width: 25%; padding: 10px;">

                  <b>Event End Date</b>
              </td>
              <td style="width: 25%;padding: 10px;">
                  <p class="">${data.endDate}</p>
              </td>
          </tr>
          <tr>
              <td style="width: 25%; padding: 10px;">
                  <b>Venue</b>
              </td>
              <td style="width: 25%; padding: 10px;">

                  <p class="">${data.venue}</p>
              </td>
              <td style="width: 25%; padding: 10px;">
                  <b>Expected Participant Count</b>
              </td>
              <td style="width: 25%; padding: 10px;">

                  <p class="">${data.count}</p>
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr>
              <td style="width: 25%; padding: 10px;">
                  <b>Chief Guest</b>
              </td>
              <td style="width: 75%; padding: 10px;">

                  <p class="">${data.guest}</p>
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr style="margin: 0">
              <td style="width: 16%; padding: 10px;">
                  <b>Expected Expense</b>
              </td>
              <td style="width: 16%; padding: 10px; ">

                  <p class="">${data.expectedExpense}</p>
              </td>
              <td style="width: 16%; padding: 10px;">

                  <b class="">Total Amount Allocated by SU</b>
              </td>
              <td style="width: 16%;padding: 10px;">
                  <p class="">${data.allocatedBudget}</p>
              </td>
              <td style="width: 16%; padding: 10px;">

                  <b class="">Total Amount spent till date of request</b>
              </td>
              <td style="width: 16%;padding: 10px;">
                  <p class="">${data.amountSpent}</p>
              </td>
          </tr>
          ${
            data.inCollab === "Yes"
              ? `
            <tr style="margin: 0">
                <td style="width: 16%; padding: 10px;">
                    <b>Is the event being conducted in collaboration with any other organization</b>
                </td>
                <td style="width: 16%; padding: 10px; ">

                    <p class="">${data.inCollab}</p>
                </td>
                <td style="width: 16%; padding: 10px;">

                    <b class="">Name of organization</b>
                </td>
                <td style="width: 16%;padding: 10px;">
                    <p class="">${data.orgName}</p>
                </td>
                <td style="width: 16%; padding: 10px;">
                    <b>How is the budget split </b>
                </td>
                <td style="width: 16%; padding: 10px; ">
                    <p class="">${data.budgetSplit}</p>
                </td>
            </tr>
          `
              : ``
          }
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr style="margin: 0">
              <td style="width: 25%; padding: 10px;">
                  <b>Faculty Observer Name</b>
              </td>
              <td style="width: 25%; padding: 10px; ">

                  <p class="">${data.facultyName}</p>
              </td>
              <td style="width: 25%; padding: 10px;">

                  <b class="">Faculty Observer Department</b>
              </td>
              <td style="width: 25%;padding: 10px;">
                  <p class="">${data.facultyDept}</p>
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr style="margin: 0; width: 100%">
              <td style="width: 25%; padding: 10px;">
                  <b>Event Description</b>
              </td>
              <td style="width: 75%; padding: 10px; ">
                  <p align="justify">${data.description}</p>
              </td>
          </tr>
      </table>
      <table style="width: 100%; background: #ffffff; padding: 10px;">
          <tr style="margin: 0; width: 100%">
              <td style="width: 25%; padding: 10px;">
                  <b>Comments</b>
              </td>
              <td style="width: 75%; padding: 10px; ">
                  <p align="justify">${data.comments ? data.comments : "NA"}</p>
              </td>
          </tr>
      </table>
      <p
      style="padding: 55px; font-weight: bold; font-size: medium; float: right;"
    >
      Signature
    </p>
    </body>
  `;
};

export default getProposalReport;
