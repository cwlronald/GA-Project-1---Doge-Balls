

let doge_balls = (function(){
    let body = document.getElementsByTagName('body')[0]
    let interval
    let both = 0
    let score = 0
    let score_actual = score-9
    let platform_current = []
    let ball_speed = 2
    let interval_speed = 1
    let platform_speed = 0.5
    let platform_speed_round = 0
    let speed_increase = 1.005
    let welcome_message = 'Welcome to Doge Balls!'
    let platform_spacing = 100
    let itwasidio = 80

    //if firefox
    let isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox){
        platform_speed*=4
        ball_speed*=4
    }

    function starting_screen(){
        let intro_box = document.createElement('div')
        intro_box.setAttribute('id','intro_box')
        body.appendChild(intro_box)

        let intro_text = document.createElement('button')
        intro_text.setAttribute('id','intro_text')
        intro_text.textContent='PLAY THE BEST GAME EVER NOW!'
        intro_box.appendChild(intro_text)

        let intro_text2 = document.createElement('div')
        intro_text2.setAttribute('class','intro_text2')
        intro_text2.textContent='Works best on Google Chrome'
        intro_text.appendChild(intro_text2)

        let intro_text2_1 = document.createElement('div')
        intro_text2_1.setAttribute('class','intro_text2')
        intro_text2_1.textContent='Buggy on firefox, and dont even try mobile.'
        intro_text.appendChild(intro_text2_1)

        document.getElementById('intro_text').onclick = function() {
            intro_text.addEventListener('click',load_game())
        }
    }

    function load_game(){

        document.querySelector('div').remove()

        let scoreboard_gamebox = document.createElement('div')
        scoreboard_gamebox.setAttribute('id','scoreboard_gamebox')
        body.appendChild(scoreboard_gamebox)

        let scoreboard = document.createElement('div')
        scoreboard.setAttribute('id','scoreboard')
        let score_text = document.createTextNode(`<div>${welcome_message}</div><div>Score: 0</div><div>Speed: ${platform_speed}</div>`)
        scoreboard.appendChild(score_text)
        scoreboard_gamebox.appendChild(scoreboard)

        let gamebox = document.createElement('div')
        gamebox.setAttribute('id','gamebox')
        scoreboard_gamebox.appendChild(gamebox)

        let ball = document.createElement('div')
        ball.setAttribute('id','ball')
        gamebox.appendChild(ball)


        //ball movement interval basically makes sure that when you hold down, the ball will keep going
        function move_ball_left(){
            let left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            if (left>0){
                ball.style.left = left-ball_speed +'px'
            }

        }
        function move_ball_right(){
            let left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            if (left<380){
                ball.style.left = left+ball_speed +'px'
            }

        }
        document.addEventListener('keydown',event =>{
            if (both == 0){
                both++
                if (event.key ==='ArrowLeft'){
                    interval = setInterval(move_ball_left,1)
                }
                if (event.key ==='ArrowRight'){
                    interval = setInterval(move_ball_right,1)
                }
            }
        })
        document.addEventListener('keyup', event => {
            clearInterval(interval)
            both = 0
        })


        let game = setInterval(function(){

            platform_speed_round = parseFloat(platform_speed.toFixed(5))

            //get reference to the previous platform/block so as to make even spacing
            let prev_platform = document.getElementById(`platform_${score-1}`)
            if (score>0){
                var prev_platform_top = parseInt(window.getComputedStyle(prev_platform).getPropertyValue('top'))
            }

            //generate the platforms and gaps
            if (prev_platform_top<385 || score == 0){

                //generate platform
                let platform = document.createElement('div')
                platform.setAttribute('class','platform')
                platform.setAttribute('id',`platform_${score}`)
                platform.style.top = prev_platform_top+platform_spacing+'px'
                gamebox.appendChild(platform)

                //generate gaps
                let gap1 = document.createElement('div')
                gap1.setAttribute('class','gap')
                gap1.setAttribute('id',`gap1_${score}`)
                gap1.style.top = prev_platform_top+platform_spacing+'px'
                random = Math.round(Math.random()*360)
                gap1.style.left = random + 'px'
                gamebox.appendChild(gap1)

                let gap2 = document.createElement('div')
                gap2.setAttribute('class','gap')
                gap2.setAttribute('id',`gap2_${score}`)
                gap2.style.top = prev_platform_top+platform_spacing+'px'
                let if_gap2_random = Math.round(Math.random())
                if (!if_gap2_random){
                    random = Math.floor(Math.random() * 360)
                }
                gap2.style.left = random + 'px'
                gamebox.appendChild(gap2)

                let gap3 = document.createElement('div')
                gap3.setAttribute('class','gap')
                gap3.setAttribute('id',`gap3_${score}`)
                gap3.style.top = prev_platform_top+platform_spacing+'px'
                let if_gap3_random = Math.round(Math.random())
                if (!if_gap3_random){
                    random = Math.floor(Math.random() * 360)
                }
                gap3.style.left = random + 'px'
                gamebox.appendChild(gap3)


                //update score + speed
                platform_current.push(score)
                score++
                score_actual++
                platform_speed*=speed_increase
                if(score_actual<0){
                    scoreboard.innerHTML=`<div>${welcome_message}</div><div>Score: 0</div><div>Speed: ${platform_speed_round}</div>`
                }else{
                    scoreboard.innerHTML=`<div>${welcome_message}</div><div>Score: ${score_actual}</div><div>Speed: ${platform_speed_round}</div>`
                }
                if(score_actual == itwasidio){
                    ball_speed*=2
                    console.log('ball speed boost')
                }


                //add audio
                let audio_track
                if (score_actual==-4){
                    audio_track = 'audio/sunrise_soundtrack.mp3'
                } else if(score_actual==itwasidio){
                    audio_track = 'audio/goldenwind_soundtrack.mp3'
                }
                audioObj = new Audio(audio_track)
                scoreboard_gamebox.appendChild(audioObj)
                audioObj.play()


            }

            //get the platforms and gaps to move
            var ball_top = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
            var ball_left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            var ball_move_down = 0


            // change background
            if (score_actual==10) {
                scoreboard_gamebox.setAttribute('class','background_10')
            } else if (score_actual==20){
                scoreboard_gamebox.setAttribute('class','background_20')
            }else if (score_actual==40){
                scoreboard_gamebox.setAttribute('class','background_40')
            }else if (score_actual==60) {
                scoreboard_gamebox.setAttribute('class','background_60')
            } else if (score_actual==itwasidio){
                scoreboard_gamebox.setAttribute('class','background_dio')
            }

            //game over condition
            if((ball_top <= 0 || ball_top >=480) && score > -9){
                if(score_actual<0){
                    alert(`Game Over! Score: 0`)
                }else{
                    alert(`Game Over! Score: ${score_actual}`)
                }
                clearInterval(game)
                location.reload()
            }

            for (let i = 0; i <platform_current.length ; i++) {
                let platform = document.getElementById(`platform_${platform_current[i]}`)
                let platform_top = parseFloat(window.getComputedStyle(platform).getPropertyValue("top"))
                platform.style.top = platform_top - platform_speed + 'px'


                let gap1 = document.getElementById(`gap1_${platform_current[i]}`)
                let gap1_left = parseFloat(window.getComputedStyle(gap1).getPropertyValue("left"))
                gap1.style.top = platform_top - platform_speed + 'px'

                let gap2 = document.getElementById(`gap2_${platform_current[i]}`)
                let gap2_left = parseFloat(window.getComputedStyle(gap2).getPropertyValue("left"))
                gap2.style.top = platform_top - platform_speed + 'px'

                let gap3 = document.getElementById(`gap3_${platform_current[i]}`)
                let gap3_left = parseFloat(window.getComputedStyle(gap3).getPropertyValue("left"))
                gap3.style.top = platform_top - platform_speed + 'px'


                // remove blocks if out of gamebox
                if (platform_top < -4){
                    platform_current.shift()
                    platform.remove()
                    gap1.remove()
                    gap2.remove()
                    gap3.remove()
                }

                //how ball interacts with platform
                if (platform_top-20<ball_top && platform_top>ball_top){
                    ball_move_down++
                    if((gap1_left<=ball_left && gap1_left+20>=ball_left) || (gap2_left<=ball_left && gap2_left+20>=ball_left) || (gap3_left<=ball_left && gap3_left+20>=ball_left) ){
                        ball_move_down=0
                    }
                } //check if ball is touching platform or gap
            }

            if (ball_move_down==0){
                if(ball_top< 480){
                    ball.style.top = ball_top+ball_speed+'px'
                }
            } else{
                ball.style.top = ball_top-platform_speed+'px'
            }
        },interval_speed);
    }

    return{
        init:function(){
            starting_screen()
        }
    }
})()


doge_balls.init()















