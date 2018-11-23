(() => {
    //init the vue stuff!
    const vm = new Vue({
        el : "#app",

        data : {
            welcomemessage : "Welcome to my Vue app. Video! and stuff.",

            videodata : [],
            singledata : [],

            videotitle : "",
            videodescription : "",
            videosource : "",

            showDetails : false 
        },

        created : function() {
            //get all of the movie data ib the oage load
            this.fetchMovieData(null); //this is where we would fetch PHP stuff
        },

        methods : {
            login() {
                //stub
                console.log('login functionality');
            },

            fetchSingle(e) {
                //debugger;
                this.fetchMovieData(e.currentTarget.dataset.movie);
            },

            loadMovie(e) {
                //debugger;
                e.preventDefault(); //block this page reload 

                dataKey = e.currentTarget.getAttribute('href'); //give me the href (video name-will either be force awakens, avenger, stranger things) and pull that object, set, then it will pull video title, description, source to whatever those things are, get those values, bound to my vue, everytime i click they change because im changing my vue someshit
                currentData = this.videodata.filter(video => video.vid_path === dataKey); //grabbing avenger, star wars, etc. and grabbing the data out of it //vue model gets updated, so does other stuff

                this.videotitle = currentData[0].vid_name;
                this.videodescription = currentData[0].vid_desc;
                this.videosource = dataKey;

                this.showDetails = true;

                setTimeout(function(){ window.scrollTo(0, 1200)}, 500);
            },

            fetchMovieData(movie) {
               let url = movie ?`./includes/index.php?movie=${movie}` : './includes/index.php'; 
                //this is a ternary statement, shorthand if else statement. left of : is true, right is false
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (movie) {
                        //store data in the single result above
                        this.singledata = data;
                    } else {
                        //initial data grab, store in the videodata array
                        this.videodata = data;
                    }
                })

                .catch(function(error){
                    console.log(error);
                });

            }
        }

    })

})();