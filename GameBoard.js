import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground ,Dimensions } from 'react-native';
import Bottle from './bottle'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    //flexDirection: "row",
    opacity: 0.75,

  },

});
export default class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //intro,game,ad,ConnexionClient,youWonAGift
      screen: 'intro',
      tab: Array.from(Array(54), (_, i) => {
        let rndm = Math.random()
        if (rndm < 0.25)
          return {
            src: require("./assets/0.png"),
            index: i,
            color: "red",
            doTanslate: false,
            translationStep: 1,
          }
        else if (rndm < 0.5)
          return {
            src: require("./assets/1.png"),
            index: i,
            color: "blue",
            doTanslate: false,
            translationStep: 1,
          }
        else if (rndm < 0.75)
          return {
            src: require("./assets/2.png"),
            index: i,
            color: "green",
            doTanslate: false,
            translationStep: 1,
          }
        else
          return {
            src: require("./assets/3.png"),
            index: i,
            color: "yellow",
            doTanslate: false,
            translationStep: 1,
          }
      }),
      timeCounter: 60,
      rowLength: 6,
      columnLength: 9,
      lastBoomTable: [],
      lastDoTranslate: [],
      lastTranslatedColumnsList: [],
      boomingInProgress: false,
      boomingJustEnded: false,
      doTanslateInprogress: false,
      doTanslateJustEnded: false,


    }
  }
  booms = (index) => {
    if (this.state.boomingInProgress || this.state.boomingJustEnded || this.state.doTanslateInprogress || this.state.doTanslateJustEnded)
      return
    let boomTable = this.calculateConnectedItems([index], index)
    if(boomTable.length<2)
      return

    this.props.updateScore(boomTable.length)
    let tab
    tab = this.state.tab.map((el, i) => {
      return boomTable.includes(i) ? { ...el,color:"boom", src: require("./assets/boom.png"), doTanslate: false } : el
    })
    // this.state.boomTable.forEach((value)=>{tab[value]=require("./assets/boom.png")})
    console.log("boomingJustStarted", tab)

    this.setState({...this.state, tab: tab, lastBoomTable: boomTable, boomingInProgress: true })

    // setTimeout(() => {
    //   this.goToScreen("ConnexionClient")
    // }, 6000);
  } 
  componentDidUpdate = () => {
    if (this.state.boomingInProgress) {
      setTimeout(() => {
        let boomTable = this.state.lastBoomTable
        let tab
        tab = this.state.tab.map((el, i) => {
          return boomTable.includes(i) ? { ...el,color:'transparent', src: null, doTanslate: false, } : el
        })
        console.log("boomingInProgress", tab)
        this.setState({...this.state, tab: tab, boomingInProgress: false, boomingJustEnded: true })
      }, 500)

    }
    if (this.state.boomingJustEnded) {
      let { translatedItemsList, translatedColumnsList } = this.calculateDoTranslateForAllItems()
      let tab
      tab = this.state.tab.map((el, i) => {
        return translatedItemsList[i] > 0 ? { ...el, color:el.color, src: el.src, doTanslate: true, translationStep: translatedItemsList[i] } : el
      })
      console.log("boomingJustEnded", tab)
      this.setState({...this.state, tab: tab, lastDoTranslate: translatedItemsList, lastTranslatedColumnsList: translatedColumnsList, boomingInProgress: false, boomingJustEnded: false, doTanslateInprogress: true })
    }
    if (this.state.doTanslateInprogress) {
      setTimeout(() => {
        this.setState({...this.state, boomingInProgress: false, boomingJustEnded: false, doTanslateInprogress: false, doTanslateJustEnded: true })
      }, 500)
    }
    if (this.state.doTanslateJustEnded) {
      let tab = this.calculateNewColorsForAffectedItems()
      console.log("doTanslateJustEnded", tab)
      this.setState({...this.state, tab: tab, boomingInProgress: false, boomingJustEnded: false, doTanslateInprogress: false, doTanslateJustEnded: false })
    }
  }
  bottleClicked = (index) => {
    this.booms(index)
  }
  slideDown = () => {
    this.forceUpdate()
  }
  getSurroundingWithSameColorItems = (currentConnectedItemsList, rowLength, columnLength, index, color) => {
    let surroundingWithSameColorItems = []
    let nbrOfnewItemsAddedToThtList = 0
    let gameBoard = this.state.tab
    if (index < ((columnLength * rowLength) - columnLength) && gameBoard[index + columnLength].color === color) {
      surroundingWithSameColorItems.push(index + columnLength);
    }
    if (index > (columnLength - 1) && gameBoard[index - columnLength].color === color) {
      surroundingWithSameColorItems.push(index - columnLength);
    }
    if (index % columnLength !== 0 && gameBoard[index - 1].color === color) {
      surroundingWithSameColorItems.push(index - 1);
    }
    if (index % columnLength !== (columnLength - 1) && gameBoard[index + 1].color === color) {
      surroundingWithSameColorItems.push(index + 1);
    }
    //get rid of doubles

    let i;
    for (i = 0; i < surroundingWithSameColorItems.length; i++) {
      if (!currentConnectedItemsList.includes(surroundingWithSameColorItems[i])) {
        currentConnectedItemsList.push(surroundingWithSameColorItems[i]);
        nbrOfnewItemsAddedToThtList++;
      }
    }
    return {
      surroundingNewItemsWithSameColor: currentConnectedItemsList,
      nbrOfnewItemsAddedToThtList: nbrOfnewItemsAddedToThtList,
    };
  }
  calculateConnectedItems = (currentConnectedItemsList, itemIndex) => {
    let gameBoard = this.state.tab
    let { surroundingNewItemsWithSameColor, nbrOfnewItemsAddedToThtList } =
      this.getSurroundingWithSameColorItems(currentConnectedItemsList, this.state.rowLength, this.state.columnLength, itemIndex, gameBoard[itemIndex].color);
    let newItemsWereAddedToThtList = (nbrOfnewItemsAddedToThtList !== 0);
    // try{
    if (newItemsWereAddedToThtList) {
      let i;
      let start = surroundingNewItemsWithSameColor.length - nbrOfnewItemsAddedToThtList
      let end = surroundingNewItemsWithSameColor.length
      for (i = start; i < end; i++) {
        surroundingNewItemsWithSameColor =
          this.calculateConnectedItems(surroundingNewItemsWithSameColor, surroundingNewItemsWithSameColor[i]);
      }
    }
    else {
      return surroundingNewItemsWithSameColor;
    }
    return surroundingNewItemsWithSameColor;
    // }
    // catch(e){
    // 	return currentConnectedItemsList;
    // }
  }
  calculateDoTranslateForAllItems = () => {
    let columnNbr = this.state.rowLength
    let columnLength = this.state.columnLength
    let doTranslateItems = new Array(this.state.columnLength * this.state.rowLength).fill(0);
    let connectedItemsList = this.state.lastBoomTable
    let doTranslateColumns = []
    //initialisation
    let i
    for (i = 0; i < columnNbr; i++) {
      doTranslateColumns.push({ startingItem: (i * columnLength), nbeOfItemsToTranslate: 0 })
    }
    let j
    for (j = 0; j < connectedItemsList.length; j++) {
      let currentItemColumnIndex = parseInt(connectedItemsList[j] / columnLength)
      doTranslateColumns[currentItemColumnIndex].nbeOfItemsToTranslate++
      if (doTranslateColumns[currentItemColumnIndex].startingItem < connectedItemsList[j])
        doTranslateColumns[currentItemColumnIndex].startingItem = connectedItemsList[j]
    }

    let k
    for (k = 0; k < columnNbr; k++) {
      let t = doTranslateColumns[k].startingItem - doTranslateColumns[k].nbeOfItemsToTranslate
      while ((t + 1) % columnLength !== 0) {
        doTranslateItems[t] = doTranslateColumns[k].nbeOfItemsToTranslate
        t--
      }
    }
    return { translatedItemsList: doTranslateItems, translatedColumnsList: doTranslateColumns }
  }
  /*calculateNewColorsForAffectedItems = () => {
    let columnNbr = this.state.rowLength
    let columnLength = this.state.columnLength
    let sortedConnectedItemsList = this.state.lastBoomTable.sort((a, b) => { return a - b })
    let columnListByBombedSortedItems = []//new Array(columnNbr).fill([]);
    let localBoardGame = [...this.state.tab];
    let colorList = ["blue", "red", "green", "yellow"]
    //intialise without fill because it does it with reference
    let i0
    for (i0 = 0; i0 < columnNbr; i0++) {
      columnListByBombedSortedItems.push([])
    }
    let i
    for (i = 0; i < sortedConnectedItemsList.length; i++) {
      columnListByBombedSortedItems[parseInt(sortedConnectedItemsList[i] / columnLength)].push(sortedConnectedItemsList[i])
    }
    let i1
    for (i1 = 0; i1 < columnNbr; i1++) {
      let k
      for (k = 0; k < columnListByBombedSortedItems[i1].length; k++) {
        let localItemIndex = columnListByBombedSortedItems[i1][k]
        let nbrOfTranslation = columnListByBombedSortedItems[i1].length
        if ((localItemIndex) % columnLength > (nbrOfTranslation - 1)) {
          localBoardGame[localItemIndex].color = localBoardGame[localItemIndex - nbrOfTranslation].color
          localBoardGame[localItemIndex].src = localBoardGame[localItemIndex - nbrOfTranslation].src
        }

        else {
          let randomInt = parseInt(Math.random() * 4)
          switch (randomInt) {
            case 0:
              localBoardGame[i2] = { src: require("./assets/0.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 1:
              localBoardGame[i2] = { src: require("./assets/1.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 2:
              localBoardGame[i2] = { src: require("./assets/2.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 3:
              localBoardGame[i2] = { src: require("./assets/3.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
          }
        }
      }
    }
    let i2
    let translatedItemsList = this.state.lastDoTranslate
    for (i2 = translatedItemsList.length - 1; i2 > -1; i2--) {
      if (translatedItemsList[i2] !== 0) {
        let itemOrderInColumn = i2 % this.state.columnLength
        let stillIntheSameColumn = (i2 - translatedItemsList[i2] > -1) && (itemOrderInColumn - translatedItemsList[i2] > -1)
        if (stillIntheSameColumn) {
          localBoardGame[i2].color = localBoardGame[i2 - translatedItemsList[i2]].color
          localBoardGame[i2].src = localBoardGame[i2 - translatedItemsList[i2]].src
          localBoardGame[i2].doTanslate = false
          localBoardGame[i2].translationStep = 1
        }
        else {
          let randomInt = parseInt(Math.random() * 4)
          switch (randomInt) {
            case 0:
              localBoardGame[i2] = { src: require("./assets/0.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 1:
              localBoardGame[i2] = { src: require("./assets/1.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 2:
              localBoardGame[i2] = { src: require("./assets/2.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
            case 3:
              localBoardGame[i2] = { src: require("./assets/3.png"), color: colorList[randomInt], doTanslate: false, translationStep: 1 }
              break;
          }
        }
      }

    }
    //last MinuteCheck
    let lmc =localBoardGame.filter((el)=>el.src===null)
    let lmncounter
    console.log("baha",lmc)
    for(lmncounter=0;lmncounter<lmc.length;lmncounter++){
      console.log("baha",lmc[lmncounter].index,lmc[lmncounter].color)

      switch (lmc[lmncounter].color) {
        case "blue":
          localBoardGame[lmc[lmncounter].index].src = {...localBoardGame[lmc[lmncounter]], src: require("./assets/0.png") , doTanslate: false, translationStep: 1 }
          break;
        case "red":
          localBoardGame[lmc[lmncounter].index].src = {...localBoardGame[lmc[lmncounter]], src: require("./assets/1.png"), doTanslate: false, translationStep: 1 }
          break;
        case "green":
          localBoardGame[lmc[lmncounter].index].src= {...localBoardGame[lmc[lmncounter]], src: require("./assets/2.png"), doTanslate: false, translationStep: 1 }
          break;
        case "yellow":
          localBoardGame[lmc[lmncounter].index].src = { ...localBoardGame[lmc[lmncounter]],src: require("./assets/3.png"), doTanslate: false, translationStep: 1 }
          break;
      }
    }
    return localBoardGame
    //return columnListByBombedSortedItems
  }*/
  calculateNewColorsForAffectedItems=()=>{
    let tab=this.state.tab
    let i 
    let colorList = ["blue", "red", "green", "yellow"]

    for(i=0;i<this.state.rowLength*this.state.columnLength;i++){

      if(tab[i].color==="transparent"){
        let randomInt = parseInt(Math.random() * 4)

        tab[i].color = colorList[randomInt]
        tab[i].doTanslate=false
        tab[i].translationStep=1
      }
      if(tab[i].doTanslate===true){
        tab[i].doTanslate=false
        tab[i].translationStep=1
      }
    }
    return tab
  }
  goToScreen = (screenName) => {
    this.setState({ ...this.state, screen: screenName })
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
      [9, 9, 9, 9, 9, 9].map((elt, index) => {
        return (
          <View key={index}>
            {
              this.state.tab.slice(index * elt, (index * elt + elt)).map((el, i) => {
                return (
                  <Bottle src={el.src}
                    key={i + (index * 9)}
                    index={i + (index * 9)}
                    bottleClicked={this.bottleClicked}
                    booms={this.booms}
                    color={el.color}
                    translationStep={el.translationStep}
                    doTanslate={el.doTanslate} />
                )
              })
            }
          </View>
        )
      })

    );
  }
}


