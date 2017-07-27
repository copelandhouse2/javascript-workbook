'use strict'

const partnerObj = {
  firstName:'Craig',
  lastName:'Copeland',
  address1:'904 Prize Oaks Dr',
  address2:'',
  city:'Cedar Park',
  state:'TX',
  zip:'78613',
  printAddress: () => {
    console.log(partnerObj.address1);
    console.log(partnerObj.address2);
    console.log(`${partnerObj.city} ${partnerObj.state} ${partnerObj.zip}`);
  }

};

partnerObj.printAddress();
console.log(`Hello ${partnerObj.firstName} ${partnerObj.lastName}`);

partnerObj.lastName = 'cars';


const partnerArr = Object.keys(partnerObj);
console.log(partnerArr , 'partner Array');


for (let i=0; i < partnerArr.length; i++) {
  console.log(partnerArr[i]);
  console.log(partnerObj[partnerArr[i]]);

}
