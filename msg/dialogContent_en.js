var DIALOG = {
  maze:[
    {
      begin: "Start your first BlocklyGame!Help the rabbit get to the destination!",
      lose: "You need to move foward with enough steps to get to the destination!",
      win: "Congratulation,you have completed the first adventure!Let`s go for our next stage!"
    },
    {
      begin: "In this stage,you need to use the 'turn' block to get to the destination!",
      lose: "Something goes wrong.Give it a thought,would it be the position you using the 'turn'block?",
      win: "Well done!The little rabbit sucessfully get to the destination!Let`s go for our next stage!"
    },
    {
      begin: "Look!There's a big carrot on the road! Using 'collect' blocks to collect carrots along the way, and towards the destination!",
      lose: ["You need to collect the carrot along the road!", "You need to caculate the right steps that you move and the turn round in the right position!"],
      win: "Fantastic!The little rabbit picked up a carrot and reached the destination!Let`s go for our next stage!"
    },
    {
      begin: "You can greatly reduce the use of blocks by using the'Repeat'blocks.Try for it!",
      lose: "You need only 6 blocks to complete this stage!Tips:You need to use the 'Repeat' block twice!",
      win:"Pretty good!You have mastered the usage of 'Repeat' block!Let`s go for our next stage!"
    },
    {
      begin: "Use as few blocks as possible,collect the carrots along the road toward the destination!",
      lose: ["You need to collect all the carrots along the road!", "The little rabbit got the wrong path,try to make it right!"],
      win:"Well done,you have finished the adventure of the fifth stage!Let`s go for our next stage!"
    },
    {
      begin: "In this stage,we need to use the logic block!Still,use as few blocks as possible!",
      lose: "You need only 4 blocks to complete this stage!And the logic blocks is necessary!",
      win: "Very well!You have preliminary mastered the usage of logic block!Let`s meet some challenge!"
    },
    {
      begin: "There are a lot of branches! Find the right path, analysis of the rules, do not let the little rabbit lost her way!",
      lose: "In this stage, the rabbit only need to judge whether there is a right road!",
      win: "Great! The rabbit succeeded in getting out of the maze! Get to the next stage and meet new challenges!"
    },
    {
      begin: "This path will be more twists and turns, to help small rabbits successfully reach the end!",
      lose: "In this stage, the rabbit must also determine whether the left and right have a way to get out of the right path!",
      win: "Great! The rabbit succeeded in getting out of the maze! Get to the next stage and meet new challenges!"
    },
    {
      begin: "This is a more complex maze, you need to carefully analyze the law of the route!",
      lose: "In this stage, you only need to judge whether there is a road ahead.",
      win:"Great! The rabbit succeeded in getting out of the maze! Get to the next stage and meet new challenges!"
    },
    {
      begin: "After getting through this maze, the rabbit will be home! But this stage is quite difficult!",
      lose: "This stage is quite difficult, you can choose to reduce the difficulty",
      win: "Congratulations to you, you have accomlished to help the little rabbit smoothly back home!"
    }
  ],
  painting: [
    {
      begin: "Can you connect these four stars with magic wand? Come and try!",
	  lose: "After each step,you need to be turned before starting the next step.",
      win: "Awesome! You have finished the first star painting! Try the next level!"
    },
    {
      begin: "Try to finish this star painting with fewer blocks!",
	  lose:"This level must be done using 'repeat' blocks"
      win: "You have a preliminary grasp of the 'repeat' block the use of blocks! Try the next level!"
    },
    {
      begin: "Try to change the angle and the frequency of repeat blocks, draw a positive pentagon star map.",
	  lose:"Failed!Maybe the angle you turned went wrong!",
      win: "Awesome! It seems that the polygon is not a problem for you! Ready to meet new challenges!"
    },
    {
      begin: "Now try to change the color of the pattern we painted!",
	  lose:"Notice that we want to draw the shape in yellow,you need to use the 'set color' blocks! Perhaps the angle you turn went wrong either!",
      win:"Very good! You have mastered the change of color operation! Let's go to the next level!"
    },
    {
      begin: "Let's try to draw a more complicated picture! Draw three diamonds to make this graphic!",
	  lose:"After completing a diamond, you need to turn right at 120 degrees to continue drawing the next diamond!",
      win:"Awesome! It seems you have a very skilled master! Hurry up to the next level!"
    },
    {
      begin: "On the basis of last level, by modifying the frequency of repeat blocks and the last paragraph of the steering angle can complete the graphics!",
	  lose:"After completing a diamond, you need to turn right 180 degrees to continue drawing the next diamond!",
      win: "Awesome! It seems you have a very skilled master! Hurry up to the next level!"
    },
    {
      begin: "Want to draw your own stars? Let's start with this little step!",
	  lose:"Must be turned to the wrong angle, try to make changes to it!",
      win: "Great! You finished the first step in painting the stars! Quickly go to the next level to draw the complete star!"
    },
    {
      begin: " Try on the basis of last level, coupled with a change of perspective, repeat five such operations, you can draw the star!",
	  lose:"After each completion of a corner, you need to turn left to 72 degrees to draw the next corner!",
      win: "Very good! You've finished a perfect five-pointed star! Then there will be more interesting challenges!"
    },
    {
      begin: "Try on the basis of the last level, modify the number of repeat blocks and the last paragraph of the steering angle, to complete the hexagram!",
	  lose:"After every corner, we need to turn 60 degrees to the left to draw the next corner",
      win: "Very good! You've finished a hexagram! Then there will be more interesting challenges!"
    },
	{
	  begin:"On the basis of the last level, fill the hexagram internal pattern!",
	  lose:"Think about it is not a turning point of the problem?",
	  win:"Congratulations!You have finished all the star painting!"
	}
  ],
  tank: [
  {
      begin:"Start your first plane war game, use the building blocks to destroy the enemies` fortress!",
	  lose:"You just need to use the 'fire' block to finish this level!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  }
  {
      begin:"Use the 'turn' block to attack the enemies`s fortress in the right side!",
	  lose:"You must use the turn block in this level!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },
    {
      begin:"Move forward a distance to attack the enemy's fortress!",
	  lose:"Think about it will not be the frequency of progressive mistakes!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"This need to travel further path to attack the enemy fortress!",
	  lose:"Think about it will not be the frequency of progressive mistakes!",
	  win:""
  },  
  {
      begin:"You need to break the wall to destroy the fortress!",
	  lose:"Think about it will not be the frequency of progressive mistakes!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"To avoid the mines around you , attack the enemy fortress! Minimize the use of blocks!",
	  lose:"Pay attention to this matter to use to repeat the building block!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"Destroy the barrier opon your path, then attack the fortress!",
	  lose:"You must choose the right path to move!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"Choose the right  path to move, attack the enemy fortress!",
	  lose:"You need to change the path you choose!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"You need to pass the left side of the channel to destroy the enemy fortress, you need to use to repeat blocks!",
	  lose:"You need to change the path you choose!",
	  win:"You successfully destroyed the fortress,let`s get to the next level!"
  },  
  {
      begin:"You need to determine the timing of the laser, the use of 'stop' blocks to avoid being hit, and finally through and destroy the enemy fortress!",
	  lose:"You need to change the path you choose!",
	  win:"Congratulations!You have finished all the plane war games!"
  },
  ],
