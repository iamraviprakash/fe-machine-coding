let state = {};
let paymentState = {};

function clearInterface({ element }) {
  element.innerHTML = "";
}

function showPaymentConfirmationInterface({ element }) {
  const confirmationContainer = document.createElement("div");
  confirmationContainer.classList.add("container");

  const messageDetails = document.createElement("div");
  const textNode = document.createTextNode("Payment done Successfully");
  messageDetails.append(textNode);

  const virAccNode = document.createElement("div");
  virAccNode.innerHTML =
    "Virtual Account Number: " + paymentState["virtual_acc"];
  messageDetails.append(virAccNode);

  const amountNode = document.createElement("div");
  amountNode.innerHTML = "Amount Paid: " + paymentState["amount"];
  messageDetails.append(amountNode);

  element.append(messageDetails);
}

function showCustomerInterface({ element }) {
  // when customer writes the virtual account use the UPI
  // show final message payment done

  const customerContainer = document.createElement("div");
  customerContainer.classList.add("container");

  const customerDetails = document.createElement("div");
  customerDetails.innerHTML = "Enter Merchant Details to Pay";
  customerContainer.append(customerDetails);

  const virtualAccInput = document.createElement("input");
  virtualAccInput.placeholder = "Enter Virtual Account";
  virtualAccInput.id = "virtual_acc";
  customerContainer.append(virtualAccInput);

  const paymentInput = document.createElement("input");
  paymentInput.placeholder = "Enter Amount";
  paymentInput.id = "amount";
  customerContainer.append(paymentInput);

  const payAmountButton = document.createElement("button");
  payAmountButton.innerHTML = "Complete Payment";
  customerContainer.append(payAmountButton);

  payAmountButton.addEventListener("click", (e) => {
    // store the virtual account for the UPI
    // switch to customer page
    const virtualAccount = document.getElementById("virtual_acc").value;
    const amount = document.getElementById("amount").value;

    paymentState = { amount, virtual_acc: virtualAccount };
    clearInterface({ element });
    showPaymentConfirmationInterface({ element });
  });

  console.log(paymentState);
  element.append(customerContainer);
}

function showVirtualAccountConfirmationInterface({ element }) {
  const accountContainer = document.createElement("div");
  accountContainer.classList.add("container");

  const merchantDetails = document.createElement("div");
  const textNode = document.createTextNode(
    "Virtual Account Created Successfully"
  );
  merchantDetails.append(textNode);

  const benNameNode = document.createElement("div");
  benNameNode.innerHTML = "Beneficiary Name: " + state["name"];
  merchantDetails.append(benNameNode);

  const virAccNode = document.createElement("div");
  virAccNode.innerHTML = "Virtual Account Number: " + state["virtual_acc"];
  merchantDetails.append(virAccNode);

  accountContainer.append(merchantDetails);

  const goNextButton = document.createElement("button");
  goNextButton.innerHTML = "Go Next";
  accountContainer.append(goNextButton);

  goNextButton.addEventListener("click", (e) => {
    clearInterface({ element });
    showCustomerInterface({ element });
  });

  element.append(accountContainer);
}

function showMerchantInterface({ element }) {
  // Merchant Input
  // UPI Id
  // Beneficiary Name

  // Virtual Account Details
  // Virtual Id

  const merchantContainer = document.createElement("div");
  merchantContainer.classList.add("container");

  const merchantDetails = document.createElement("div");
  merchantDetails.innerHTML =
    "Enter Merchant Details to Create Virtual Account";
  merchantContainer.append(merchantDetails);

  const upiIdInput = document.createElement("input");
  upiIdInput.placeholder = "Enter UPI ID";
  upiIdInput.id = "up_id";
  merchantContainer.append(upiIdInput);

  const beneficiaryInput = document.createElement("input");
  beneficiaryInput.placeholder = "Enter Beneficiary Name";
  beneficiaryInput.id = "ben_name";
  merchantContainer.append(beneficiaryInput);

  const createVirtualAccButton = document.createElement("button");
  createVirtualAccButton.innerHTML = "Create Virtual Account";
  merchantContainer.append(createVirtualAccButton);

  createVirtualAccButton.addEventListener("click", (e) => {
    // store the virtual account for the UPI
    // switch to customer page
    const upiId = document.getElementById("up_id").value;
    const beneficiaryName = document.getElementById("ben_name").value;

    state = { upi_id: upiId, name: beneficiaryName, virtual_acc: "1234" };
    clearInterface({ element });
    showVirtualAccountConfirmationInterface({ element });
  });

  element.append(merchantContainer);
}

function App() {
  const element = document.getElementById("root");

  showMerchantInterface({ element });
}

App();
