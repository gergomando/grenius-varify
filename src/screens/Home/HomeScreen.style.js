import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title : {
    flexDirection: 'row',
    color: '#ff0505',
    fontSize: 46,
    margin:'auto',
    paddingBottom: 36,
  },
  heroImg: {
    height:80,
    marginBottom: 48,
  },
  playBtn: {
    marginTop:12,
    marginBottom:16,
    justifyContent: 'center',
    overflow:'hidden',
    backgroundColor:'#F9D300',
    borderColor:'#f28807',
    borderRadius:16, 
    borderWidth:1,
    borderBottomWidth: 4,
    width: 210,
  },
  playBtnFb: {
    backgroundColor:'#4F3E9A',
    borderColor: '#1f0d6b',
  },
  playBtnInside: {
    padding:30,
    paddingBottom:16,
    paddingTop:16,
    fontSize: 18,
    color: 'rgb(58,40,0)',
    fontWeight:'bold',
  },
  playBtnInsideFb : {
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    fontSize: 18,
  },
  backgroundImage: {
    flex:1,
    resizeMode:'cover',
    width:null,
    height:null,
  },
});
