    "use strict"
    const SHA256 = require('crypto-js/sha256');

    class Block{

        constructor(index, timestamp, data, previousHash ){

        //index= where the block is on the chain
        //timestamp= when the block was created
        //data= any type of data that we might want to associate with this block such as details of currencies or transactions
        //previousHash= It is a string that contains the hash of block before the current one

        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); // this will contain the hash of the block
        }


    //The following function is going to calculate the hash of this block
        calculateHash(){
            return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
        }
    }

    class Blockchain{

    //The constructor is responsible for initializing our blockchain
        constructor(){

        this.chain = [this.createGenesisBlock()]; // array of blocks

        }

    createGenesisBlock(){
        return new Block(0, "12/11/2017", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;  // set previous hash to last block on the chain
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    }



    let pratikBitCoin = new Blockchain();
    pratikBitCoin.addBlock(new Block(1,"12/12/2017", {amount: 4}));
    pratikBitCoin.addBlock(new Block(2,"01/02/2018", {amount: 10}));

    console.log(JSON.stringify(pratikBitCoin, null, 4));


