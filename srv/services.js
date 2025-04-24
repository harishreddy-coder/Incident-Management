
const cds = require('@sap/cds');

class ProcessorService extends cds.ApplicationService {
    
    async init() {
      const user = new cds.User('userId');
   const {Incidents, Customers} = this.entities;

   this.before('CREATE', 'Incidents', (req) => {
    const val = req.data.status_code;
         if(val == 'C')
         {
            return req.error(101, `cannot create incident with status_code: ${val}`, 'status_code')
         }
   })

   this.before('DELETE', 'Incidents', (req) => {
    req.reject('Cannot Delete the Incident.')
   })

  this.on('READ', 'Incidents', 
    async (req) => {
    // let result = await SELECT.from(Incidents).where({title:'Solar panel broken'})
    // return result;
    if (req.user.is('admin')) {
      let result = await SELECT `customer_ID,title` .from `Incidents` .where `customer_ID = ${'1004161'}`
    return result;
    } else {
      req.reject('Admin role is required to execute this operation')
    }
    
  }
   );

  this.on('READ','Customers', async(req) => {
    if (req.user.is('admin')) {
   let out = await SELECT.from(Customers).where({ID:'1004155'});

   return out;
} else {
  req.reject('Admin role is required to execute this operation')
}
    
  })
         
        return super.init();
    }
}

module.exports = ProcessorService;