import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  itemContainer : {
    flex:1,

  },
  backgroundImage : {
    flex:1,
    resizeMode:'cover',
    width:null,
    height:null,
    paddingBottom:16,
  },
  playBtn : {
    width:80,
    padding:8,
    flex:1,
  },
  title : {
      flexDirection: 'row',
      color: '#fff',
      fontSize: 26,
      margin:'auto',
      alignSelf:'center',
      paddingTop:0,
      fontWeight: 'bold',
      alignItems:'center',
  },
  equationList : {
    padding: 12,
    alignItems:'center',
    paddingBottom:0,
  },
  multiplierImage: {
    width:95, 
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',    
  },
  variable: {
    height: 36,
    width:36,
  },
  equationItem: {
    flexDirection:'row',
    height:96,
    paddingTop: 6,
    paddingBottom:12,
    justifyContent: 'center',
  },
  noBorder: {
    flexDirection:'row',
    height:96,
    paddingTop: 6,
    paddingBottom:20,
    justifyContent: 'center',
    borderBottomWidth:2,
    borderBottomColor: '#02d34b',
  },
  answerListWrapper : {
    paddingLeft: 12,
    paddingRight:12,
  },
  answerList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:8,
  },
    
  answerBtn: {
    justifyContent: 'center',
    height:64,
    width:64,
    overflow:'hidden',
    borderRadius:32, 
    backgroundColor:'#F9D300',
    borderWidth: 2,
    borderBottomWidth:5,
    borderColor:'#f28807',
  },
  answerBtnText: {
    fontSize: 20,
    color: 'rgb(58,40,0)',
    fontWeight:'bold',
  },
  fontRed: {
    color: '#f00',
  },
  fontYellow: {
    color: '#f2a705',
  },
  maki: {
    alignSelf: 'center',
  },
  operator: {
    width:36,
    alignItems:'center',
    fontSize: 32,
    color:'#fff',
    paddingTop:16,
    paddingLeft:8,
    paddingRight:8,
    fontWeight:'bold',
  },
  resultWrapper: {
    color:'#fff',
    width: 120,
    paddingTop:16,
    paddingLeft:12,
    fontWeight:'bold',
    flexDirection: 'row',
  },
  equalSign: {
    fontSize: 32,
    color:'#fff',
    fontWeight:'bold',
    width:60,
    flex:1,
  },
  result: {
    flex:1,
    fontSize: 32,
    color:'#fff',
    fontWeight:'bold',
  },
  resultLast: {
    flex:1,
    fontSize: 32,
    color: '#02d34b',
    fontWeight:'bold',
  }
});
