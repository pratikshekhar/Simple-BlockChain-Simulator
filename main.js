    "use strict"
    const SHA256 = require('crypto-js/sha256'); //using SHA256 to calculate the has

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
        this.hash = this.calculateHash(); // This will calculate the hash of the block
        this.nonce =0; // Random value
        }

        //The following function is going to calculate the hash of this block
        calculateHash(){
            return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
        }

        mineBlock(difficulty){  // bitcoin requires hash  of a block to have certain number of Zero's which I'm specifying as difficulty
            while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
                this.nonce++;
                this.hash = this.calculateHash(); // recalculates the hash to begin with certain amount of zero's
            }
            console.log("Block Mined: " + this.hash);
        }
    }

    class Blockchain{
        //The constructor is responsible for initializing our blockchain
        constructor(){
        this.chain = [this.createGenesisBlock()]; // array of blocks
        this.difficulty =5;
        }

        createGenesisBlock(){ // The block is Genesis block and I created this manually. It doesn't point to any previous hash.
            return new Block(0, "12/11/2017", "Genesis Block", "0");
        }

        getLatestBlock(){ // It returns the latest block in the chain
            return this.chain[this.chain.length-1];
        }

        addBlock(newBlock){ // It adds new block on to the chain
            newBlock.previousHash = this.getLatestBlock().hash;  // set previous hash to last block on the chain
            newBlock.mineBlock(this.difficulty);
            this.chain.push(newBlock);  //This pushes on to the chain
        }

        isChainValid(){  //To check the validity of my block chain

            for(let i=1; i<this.chain.length;i++){ // not starting with block 0 because it is a genesis block

                const currentBlock = this.chain[i];   // current block
                const previousBlock = this.chain[i-1]; // previous block

                if(currentBlock.hash!== currentBlock.calculateHash()){   // To check if the hash is still valid
                    return false;
                }

                if(currentBlock.previousHash !== previousBlock.hash){  // If the block points to correct previous block
                    return false;
                }
            }
            return true;
        }
    }


    //OUTPUT TO CONSOLE

    let pratikBitCoin = new Blockchain(); // creating an instance of my blockchain

    console.log('Mining Block 1..... ');
    pratikBitCoin.addBlock(new Block(1,"12/12/2017", {amount: 4})); //adding block 1

    console.log('Is chain valid? ' + pratikBitCoin.isChainValid());

    console.log('Mining Block 2..... ');
    pratikBitCoin.addBlock(new Block(2,"01/02/2018", {amount: 10})); //adding block 2

    console.log(JSON.stringify(pratikBitCoin, null, 4));


