
const cds = require('@sap/cds');

class ProcessorService extends cds.ApplicationService {
    init() {

   const {Incidents} = this.entities;

   this.before('CREATE', 'Incidents', (req) => {
    const val = req.data.status_code;
         if(val == 'C')
         {
            return req.error(101, `cannot create incident with status_code: ${val}`, 'status_code')
         }

    //req.reject('Cannot insert incident currently!')
   })

   this.before('DELETE', 'Incidents', (req) => {
    req.reject('Cannot Delete the Incident.')
   })

        return super.init();
    }
}

module.exports = ProcessorService;