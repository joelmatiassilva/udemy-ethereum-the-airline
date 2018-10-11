export class AirlineService {

    constructor(contract){
        this.contract = contract;
    }

    async buyFlight(flightIndex, from, value)  {
        return this.contract.buyFlight(flightIndex, { from, value })
    }

    async getFlights() {
        let total = await this.getTotalFlights();
        let flights = [];
        for (let index = 0; index < total; index++) {
            let  flight = await this.contract.flights(index);
            flights.push(flight);
            
        }
        return this.mapFlights(flights);
    };

    async getCustomerFlights(account) {
        let customerTotalFlights = await this.contract.customerTotalFlights(account);
        console.log('aca es el error')
        let flights = [];
        for (let index = 0; index < customerTotalFlights.toNumber(); index++) {
            console.log(index)
            console.log(account)
            let flight = await this.contract.customerFlights(account, index);
            flights.push(flight);
            
        }
        console.log('2')
        return this.mapFlights(flights);
    };

    async getTotalFlights() {
        return (await this.contract.totalFlights()).toNumber();

    }

    getRefundableEther(from) {
        return this.contract.getRefundableEther({ from });
    }

    redeemLoyaltyPoints(from) {
        console.log(from);
        return this.contract.redeemLoyaltyPoints({ from });
    }


    mapFlights(flights) {
        return flights.map(flight =>{
            console.log(flight);
            return {
                name: flight[0],
                price: flight[1].toNumber()
            }
        })
    }
}