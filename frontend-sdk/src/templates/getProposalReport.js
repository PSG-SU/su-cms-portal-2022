const getProposalReport = (data, clubName) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const createdAt = new Date(data.createdAt);

    const timeFormat = (dateTime) => {
        return `${(dateTime.getHours() < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) <= 12 ?
            dateTime.getHours() :
            ((parseInt(dateTime.getHours().toString()) - 12 < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) - 12)))}:${(dateTime.getMinutes() < 10 && '0') + dateTime.getMinutes()}
      ${dateTime.getHours() < 12 ? " AM" : " PM"}`
    }

    const status = {
        "pending": "Pending for Approval",
        "facApproved": "Approved by Faculty Advisor",
        "deanApproved": "Approved by Dean, Students Union",
        "rejected": "Rejected",
        "published": "Published",
        "approvalVerification": "Waiting for Principal Approval Verification",
    };

    return `
    <body style="width: 21cm; height: 29.7cm;  display: block; font-family: Inter, sans-serif;">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet">
      <table style="width: 100%; background: #eeeeee; padding: 10px; border-radius: 12px;">
      <tr>
            <td style="width: 160px; text-align: right; padding: 14px 14px 14px 28px;">
                <img width="80px" height="80px"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png" />
            </td>
            <td style="text-align: left;">
                <p style="margin-top: -25px; font-weight: 600; font-size: 28px">PSG College of Technology</p>
                <p style="font-size: 22px; font-weight: 500;">${clubName}</p>
                <p style="font-size: 18px; margin-top: 2px;">Event Approval Form</p>
            </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 20px">
          <tr style="margin: 0">
              <td style="width: 20%; padding: 10px;">
                  <b style="font-weight:600;">Event Title</b>
              </td>
              <td style="width: 30%; padding: 10px; ">
                  <p class="">${data.eventName}</p>
              </td>
              <td style="width: 30%; padding: 10px;">
                  <b style="font-weight:600;">Proposal Created On</b>
              </td>
              <td style="width: 20%; padding: 10px;">
                  <p class="">${createdAt.getDate()} ${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}</p>
              </td>
          </tr>
        </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px">
          <tr style="margin: 0">
              <td style="width: 20%; padding: 10px;">
                  <b style="font-weight:600;">Start Date</b>
              </td>
              <td style="width: 30%; padding: 10px; ">
                <p class="">${startDate.getDate()} ${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}</p>
                <p class="">${timeFormat(startDate)}</p>
              </td>
              <td style="width: 30%; padding: 10px;">

                  <b style="font-weight:600;">End Date</b>
              </td>
              <td style="width: 20%; padding: 10px;">
                <p class="">${endDate.getDate()} ${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}</p>
                <p class="">${timeFormat(endDate)}</p>
              </td>
          </tr>
          </table>

        <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
            <tr style="margin: 0; width: 100%">
                <td style="width: 20%; padding: 10px;">
                    <b style="font-weight:600;">Event Description</b>
                </td>
                <td style="width: 80%; padding: 10px;">
                    <p align="justify">${data.description.split("\n").join("<br />")}</p>
                </td>
            </tr>
        </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px">
          <tr>
              <td style="width: 20%; padding: 10px;">
                  <b style="font-weight:600;">Venue</b>
              </td>
              <td style="width: 30%; padding: 10px;">

                  <p class="">${data.venue}</p>
              </td>
              <td style="width: 30%; padding: 10px;">
                  <b style="font-weight:600;">Expected Participant Count</b>
              </td>
              <td style="width: 20%; padding: 10px;">

                  <p class="">${data.count}</p>
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px">
        ${data.guest
            ? `
          <tr>
              <td style="width: 20%; padding: 10px;">
                  <b style="font-weight:600;">Chief Guest</b>
              </td>
              <td style="width: 80%; padding: 10px;">

                  <p class="">${data.guest}</p>
              </td>
          </tr>
        `: ``}
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
        <tr style="margin: 0">
            <td style="width: 50%; padding: 10px;">
                <b style="font-weight:600;">Expected Expense for the Event</b>
            </td>
            <td style="width: 50%; padding: 10px; ">
                <p class="">Rs. ${data.expectedExpense}</p>
            </td>
        </tr>
        <tr style="margin: 0">
            <td style="width: 50%; padding: 10px;">
                <b style="font-weight:600;">Total Amount Allocated by Students Union</b>
            </td>
            <td style="width: 50%; padding: 10px; ">
                <p class="">Rs. ${data.allocatedBudget}</p>
            </td>
        </tr>
        <tr style="margin: 0">
            <td style="width: 50%; padding: 10px;">
                <b style="font-weight:600;">Total Amount spent till the Date of Request</b>
            </td>
            <td style="width: 50%; padding: 10px; ">
                <p class="">Rs. ${data.amountSpent}</p>
            </td>
        </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
            ${data.inCollab === "Yes"
            ? `
                <tr style="margin: 0">
                    <td style="width: 25%; padding: 10px;">
                        <b style="font-weight:600;">Name of the collaboration organization</b>
                    </td>
                    <td style="width: 25%;padding: 10px;">
                        <p class="">${data.orgName}</p>
                    </td>
                    <td style="width: 20%; padding: 10px;">
                        <b style="font-weight:600;">Budget split </b>
                    </td>
                    <td style="width: 30%; padding: 10px; ">
                        <p class="">${data.budgetSplit}</p>
                    </td>
                </tr>
            `
            : ``}
        </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
          <tr style="margin: 0">
              <td style="width: 25%; padding: 10px;">
                  <b style="font-weight:600;">Name of the Faculty Observer</b>
              </td>
              <td style="width: 25%; padding: 10px; ">

                  <p class="">${data.facultyName}</p>
              </td>
              <td style="width: 20%; padding: 10px;">

                  <b style="font-weight:600;">Department</b>
              </td>
              <td style="width: 30%;padding: 10px;">
                  <p class="">${data.facultyDept}</p>
              </td>
          </tr>
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
        ${data.comments === "Yes"
            ? `
            <tr style="margin: 0; width: 100%">
                <td style="width: 25%; padding: 10px;">
                    <b style="font-weight:600;">Comments</b>
                </td>
                <td style="width: 75%; padding: 10px; ">
                    <p align="justify">${data.comments}</p>
                </td>
            </tr>
        `: ``}
      </table>

      <table style="width: 100%; background: #ffffff; padding: 10px; margin-top: 10px;">
      <tr style="margin: 0; width: 100%">
          <td style="width: 25%; padding: 10px;">
              <b style="font-weight:600;">Status</b>
          </td>
          <td style="width: 75%; padding: 10px; ">
              <p align="justify">${status[data.status]}</p>
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

export const imageAttachement = (url) => `
  <div style="background-image: url(${url}); height: 100vh;background-position: center; background-repeat: no-repeat; background-size: cover;"> </div>
  `;
