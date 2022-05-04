const apicall = async () => {
  try {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        origin: "http://localhost:5500/smallcaseintegration/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        info: {intent: "CONNECT"},
      }),
    });
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    console.log(err);
  }
};

const triggerTransaction = (gatewayInstance, transactiondetails) =>{
  const {transactionId} = transactiondetails || {};
  gatewayInstance.triggerTransaction({
    transactionId
  })
  .then(txnResponse => {
    console.log('received response:', txnResponse);
  })
  .catch(err => {
    console.log('received error:', err.message);
  });
}

const connect = document.getElementById("connect");

connect.addEventListener("click", () => {
  apicall().then((responseJSON) => {
    const {details, auth_token} = responseJSON || {};
    const {data: transactiondetails = {}} = details || {};
    console.log(window,window.scDK)
    const gatewayInstance = new window.scDK({
      gateway: "goalfi",
      smallcaseAuthToken: auth_token,
      config: {
        amo: true
      },
    })
    
     triggerTransaction(gatewayInstance,transactiondetails);
    console.log(transactiondetails);
  });
});
