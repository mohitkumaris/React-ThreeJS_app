import React, { Component } from 'react';

/**
 * ComponentName
 */
export class SideMenu extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{marginTop:20, display:'flex',flexDirection:'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <div style={sideMenuItem} onClick={this.props.addSquare}>Add Square</div>
        <div style={sideMenuItem} onClick={this.props.removeSquare}>Remove Square</div>
        <div style={sideMenuItem}>Scale</div>
        <div style={{alignItems: 'center', justifyContent: 'center', width:'100%', display: 'flex'}}>
        <div style={{float:'left', display:'inline', padding:20, fontSize: 20, backgroundColor: 'black', color:'white', marginRight: 20}}
        onClick={()=>{this.props.scaleUp()}}
        >
        +
        </div>
        <div style={{float:'left', display:'inline', padding:20, fontSize: 24, backgroundColor: 'black', color:'white'}}
        onClick={()=>{this.props.scaleDown()}}
        >
        -
        </div>
        </div>

      </div>
    );
  }
}
const sideMenuItem = {
  width:'100%',
  height:32,
  paddingTop:16,
  fontWeight: 'bold',
  border: '2px solid #ecf0f1',
  backgroundColor:'#fff',
  justifyContent: 'center',
  alignItems:'center'
}
export default SideMenu;
