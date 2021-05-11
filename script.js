


let drop_my_balls = (function(){

    let body = document.getElementsByTagName('body')[0]
    let interval
    let both = 0
    let score = 0
    let score_actual = score-9
    let platform_spacing = 100
    let platform_current = []

    function load_game(){



        let scoreboard = document.createElement('div')
        scoreboard.setAttribute('id','scoreboard')
        let score_text = document.createTextNode(`Welcome to Drop my Balls!\n Score: ${score_actual}`)
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
                ball.style.left = left-1+'px'
            }

        }
        function move_ball_right(){
            let left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            if (left<380){
                ball.style.left = left+1+'px'
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
            if (prev_platform_top<400 || score == 0){
                //generate platform
                let platform = document.createElement('div')
                platform.setAttribute('class','platform')
                platform.setAttribute('id',`platform_${score}`)
                platform.style.top = prev_platform_top+platform_spacing+'px'
                gamebox.appendChild(platform)

                //generate gaps
                let gap = document.createElement('div')
                gap.setAttribute('class','gap')
                gap.setAttribute('id',`gap_${score}`)
                gap.style.top = prev_platform_top+platform_spacing+'px'
                let random = Math.floor(Math.random() * 360)
                gap.style.left = random + 'px'
                gamebox.appendChild(gap)

                platform_current.push(score)
                score++
                score_actual++
                console.log(score)
                console.log(score_actual)
                if(score_actual<0){
                    scoreboard.innerHTML=`Welcome to Drop my Balls!\nScore: 0`
                }else{
                    scoreboard.innerHTML=`Welcome to Drop my Balls!\nScore: ${score_actual}`
                }

            }

            //get the platforms and gaps to move
            var ball_top = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
            var ball_left = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
            var ball_move_down = 0


            //game over condition
            // if(ball_top <= 0){
            //     alert('Game Over! Score: '+ (score-9))
            //     clearInterval(game)
            //     location.reload()
            // }

            for (let i = 0; i <platform_current.length ; i++) {
                let platform = document.getElementById(`platform_${platform_current[i]}`)
                let gap = document.getElementById(`gap_${platform_current[i]}`)
                let platform_top = parseFloat(window.getComputedStyle(platform).getPropertyValue("top"))
                let gap_left = parseFloat(window.getComputedStyle(gap).getPropertyValue("left"))
                platform.style.top = platform_top - 0.5 + 'px'
                gap.style.top = platform_top - 0.5 + 'px'

                // remove blocks if out of gamebox
                if (platform_top < -4){
                    platform_current.shift()
                    platform.remove()
                    gap.remove()
                }

                //how ball interacts with platform
                if (platform_top-20<ball_top && platform_top>ball_top){
                    ball_move_down++
                    if(gap_left<=ball_left && gap_left+20>=ball_left){
                        ball_move_down=0
                    }
                } //check if ball is touching platform or gap
            }

            if (ball_move_down==0){
                if(ball_top< 480){
                    ball.style.top = ball_top+2+'px'
                }
            } else{
                ball.style.top = ball_top-0.5+'px'
            }
        },5);
    }

    return{
        init:function(){
            load_game()
        }
    }
})()

drop_my_balls.init()














// multiple gaps
// let blocks = setInterval(function(){
//
//     //get reference to the previous platform/block so as to make even spacing
//     let prev_platform = document.getElementById(`platform_${score-1}`)
//     let prev_gap = document.getElementsByName(`gap_${score-1}`)[0]
//     if (score>0){
//         var prev_platform_top = parseInt(window.getComputedStyle(prev_platform).getPropertyValue('top'))
//         var prev_gap_top = parseInt(window.getComputedStyle(prev_gap).getPropertyValue('top'))
//     }
//
//     if (prev_platform_top<400 || score == 0){
//         //generate platform
//         let platform = document.createElement('div')
//         platform.setAttribute('class','platform')
//         platform.setAttribute('id',`platform_${score}`)
//         platform.style.top = prev_platform_top+platform_spacing+'px'
//         gamebox.appendChild(platform)
//
//
//         //generate gaps
//         let gap_list = {}
//         for (let i = 0; i < Math.floor(Math.random() * 2) + 1  ; i++) {
//             let gap = document.createElement('div')
//             gap.setAttribute('class','gap')
//             gap.setAttribute('name',`gap_${score}`)
//             gap.setAttribute('id',`gap_${score}_${i}`)
//             let random = Math.floor(Math.random() * 360)
//             gap.style.left = random + 'px'
//             gap.style.top = prev_gap_top+platform_spacing+'px'
//             gap_list[`gap${i}`] = `gap_${score}_${i}`
//
//             gamebox.appendChild(gap)
//         }
//
//
//         platform_current.push(gap_list)
//
//         score++
//     }
//     // im stuck here please help......
//     for (var j = 0; j < platform_current.length; j++) {
//         let current = platform_current[j]
//         let iblock = document.getElementById(`platform_${j}`)
//         let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'))
//         iblock.style.top = iblockTop-0.5+'px'
//         for (i in platform_current){
//             for (x in platform_current[i]){
//                 let igap = document.getElementById(platform_current[i][x])
//                 let igapTop = parseFloat(window.getComputedStyle(igap).getPropertyValue('top'))
//                 igap.style.top = igapTop-0.5+'px'
//             }
//             // platform_current.shift()
//         }
//     }
//
// },1000);












