import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  mainMenu: {
    paddingTop:24,
    padding:12,
    paddingRight:0,
    paddingBottom:0,
    flexDirection: 'row',
  },
  levelMenu: {
    paddingRight:12,
  },
  rightIcon: {
    alignSelf: 'center',
  },
  feedbackContainer: {
    height: 30,
    display: 'none',
  },
  timer: {
    flex: 1,
    color: '#1ac92e',
    fontWeight: 'bold',
    fontSize: 20,
  },
  pointIcon: {
    height: 40,
    width: 42,
  },
  level: {
    color: 'white',
    textAlign:'right',
    fontSize: 18,
    fontWeight: 'bold',
  },
  point: {
    color: '#f2a705',
    fontSize: 22,
    fontWeight:'bold',
    flex:1,
    textAlign: 'right',
  },
  lastpoint: {
    color:'#1ac92e',
    alignSelf:'flex-end',
    paddingRight:12,
    fontSize:18,
  },
  rightAnswerNr: {
    color:'#1ac92e',
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  shareBtn: {
    justifyContent: 'center',
    overflow:'hidden',
    backgroundColor:'#F9D300',
    borderColor:'#f28807',
    borderRadius:16, 
    borderWidth:1,
    borderBottomWidth: 4,
  },
  shareBtnText: {
    padding:5,
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: 15,
    color: 'rgb(58,40,0)',
    fontWeight:'bold',
  },
});
