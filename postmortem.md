

##What in my process and approach to this project would I do differently next time?
I would plan out how the different elements interact with each other better
    
##What in my process and approach to this project went well that I would repeat next time?
What went well was how I broke down each part and systematically built them before putting them together


##What in my code and program design in the project would I do differently next time?
Using OOP or for loop to create the gaps and also figure out how to use a for loop to move the gaps with the platforms, i couldnt figure that part out, the code i made for it resulted in the gaps moving up faster than the platforms. 

i would also like to make the code neater and create a function for everything. I did something similar for the train assignment. this really increases the readability


    let gap1 = document.getElementById(`gap1_${platform_current[i]}`)
    let gap1_left = parseFloat(window.getComputedStyle(gap1).getPropertyValue("left"))
    gap1.style.top = platform_top - platform_speed + 'px'

    let gap2 = document.getElementById(`gap2_${platform_current[i]}`)
    let gap2_left = parseFloat(window.getComputedStyle(gap2).getPropertyValue("left"))
    gap2.style.top = platform_top - platform_speed + 'px'
    
    let gap3 = document.getElementById(`gap3_${platform_current[i]}`)
    let gap3_left = parseFloat(window.getComputedStyle(gap3).getPropertyValue("left"))
    gap3.style.top = platform_top - platform_speed + 'px'
--

##What in my code and program design in the project went well? Is there anything I would do the same next time?
what went well was how i labeled everything and kept the code as neat as possible. Even for certain segments where i could have made the code shorter, i kept them long because it was easier to read and understand the formatting


