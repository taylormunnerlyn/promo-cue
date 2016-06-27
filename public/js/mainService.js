angular.module('app').service('mainService', function(){

  var clients = [
    {
      name: 'Taylor',
      phone: 8012222451,
      number: 6
    },
    {
      name: 'James',
      phone: 8012222452,
      number: 4
    },
    {
      name: 'Carrie',
      phone: 8012222453,
      number: 5
    },
    {
      name: 'Madi',
      phone: 8012222454,
      number: 3
    }
  ]


  this.getClients = function(){
    return clients;
  }


})
