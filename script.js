

let drop_my_balls = (function(){
    let body = document.getElementsByTagName('body')[0]
    let interval
    let both = 0
    let score = 0
    let score_actual = score-9
    let platform_current = []
    let ball_speed = 2
    let interval_speed = 1
    let platform_speed = 0.5
    let speed_increase = 1.005
    let welcome_message = 'Welcome to Doge Balls!'


    let platform_spacing = 100

    function load_game(){

        let scoreboard = document.createElement('div')
        scoreboard.setAttribute('id','scoreboard')
        let score_text = document.createTextNode(`${welcome_message}\n Score: ${score_actual}`)
        scoreboard.appendChild(score_text)
        body.appendChild(scoreboard)

        let gamebox = document.createElement('div')
        gamebox.setAttribute('id','gamebox')
        body.appendChild(gamebox)

        let ball = document.createElement('div')
        ball.setAttribute('id','ball')
        gamebox.appendChild(ball)


        //ball movement
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
                random = Math.floor(Math.random() * 360)
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



                platform_current.push(score)
                score++
                score_actual++
                platform_speed*=speed_increase

                if(score_actual<0){
                    scoreboard.innerHTML=`${welcome_message}\nScore: 0`
                }else{
                    scoreboard.innerHTML=`${welcome_message}\nScore: ${score_actual}`
                }
                console.log(platform_speed)
                console.log(score_actual)
            }

            //get the platforms and gaps to move
            var ball_top = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
            var ball_left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            var ball_move_down = 0


            // speed up
            if (score_actual==10) {
                body.setAttribute('class','background_10')
            } else if (score_actual==20){
                body.setAttribute('class','background_20')
            } else if (score_actual==30){
                body.setAttribute('class','background_30')
            }else if (score_actual==40){
                body.setAttribute('class','background_40')
            }else if (score_actual==50){
                body.setAttribute('class','background_50')
            }else if (score_actual==60) {
                body.setAttribute('class', 'none')
            }

            //game over condition
            if(ball_top <= 0){
                alert('Game Over! Score: '+ (score-9))
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
                    ball.style.top = ball_top+2+'px'
                }
            } else{
                ball.style.top = ball_top-platform_speed+'px'
            }
        },interval_speed);
    }


    return{
        init:function(){
            load_game()
        }
    }
})()
drop_my_balls.init()















