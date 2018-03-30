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
    paddingLeft: 12,
    paddingRight:12,
    flexDirection: 'row',
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
    flex:1,
    justifyContent: 'flex-end',
  },

  linksWrapper: {
    flex: 1,
  },
  shareBtn: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4F3E9A',
    borderColor: '#1f0d6b',
    borderRadius: 25,
    paddingTop: 2,
    width: 34,
    height: 34,
    borderWidth:1,
    borderBottomWidth: 4,
  },
  shareBtnIcon: {
    width: 20,
    height: 20,
  },
});
