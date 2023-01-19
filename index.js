Vue.createApp({
    data() {
      return { 
        cities: null,
        name: "",
        population: null,
        newname: "",
        newpopulation: null,
        select: ""
    }
    },
    created() {
      this.fetchCities()
      
    },
    

    

    methods: {
        exitEditMode() {

            this.select = null

          },


        addCity() {
            fetch('https://avancera.app/cities/',{
      body: JSON.stringify({ name: this.name, population: this.population}),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
              .then((response) => response.json())
              .then((result) => {
                this.cities = result
              })
          },
          putCity() {
        
            fetch('https://avancera.app/cities/' + this.select,{
      body: JSON.stringify({ id: this.select, name: this.newname, population: this.newpopulation}),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })

    .then((response) => {

        this.fetchCities().then(() => {

          this.exitEditMode()

        })

      })  
          },
          deleteCity() {
            fetch('https://avancera.app/cities/' + this.select,{
      method: 'DELETE'
    })
    .then((response) => {

        this.fetchCities().then(() => {

          this.exitEditMode()

        })

      })  
          },
    fetchCities() {
        fetch('https://avancera.app/cities/')
          .then((response) => response.json())
          .then((result) => {
            this.cities = result
          })
      }
    }
  }).mount('#app')