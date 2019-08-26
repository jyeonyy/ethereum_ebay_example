var ecommerceStoreArtifact =require('./build/contracts/EcommerceStore.json')
var Web3 = require('web3')
var contract = require('truffle-contract')
var provider = new Web3.prodivers.HttpProvider("http://localhost:8545");
var EcommerceStore = contract(ecommerceStoreArtifact);
EcommerceStore.setProvider(provider);

var express = require('express');

var app = express();

app.listen(3000, function(){
  console.log("Ebay on Ethereum server listening on port 3000");

});

app.get('/', function(req,res){
  res.send("hello, ethereum");
});

setupProductEventListner();

function setupProductEventListner(){
  var productEvent;
  EcommerceStore.deployed().then(function(i){
    productEvent = i.NewProduct({fromBlock: 0, toBlock: 'latest'})
    productEvent.watch(function(err, result){
      if(err){
        console.log(err)
        return;
      }
      console.log(result.args);
    });
  });
}
