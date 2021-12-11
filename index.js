let canvasBoard = document.querySelector("canvas");
    let body = document.querySelector("body");

    // default width of canvas board is smaller
    canvasBoard.height=window.innerHeight;
    canvasBoard.width=window.innerWidth;
    // this line gives us a tool to draw on the canvas
    let tool =canvasBoard.getContext("2d");
    // tool.fillRect(0,0,200,200);

        let pencil=document.querySelector("#pencil");
        let eraser=document.querySelector("#eraser");
        let rect=document.querySelector("#rect");
        let line=document.querySelector("#line");
        let options=document.querySelectorAll(".size-container");
        let currentTool="pencil";
        let currentColor="black";
        let iX,iY,fX,fY;
        pencil.addEventListener("click", function(){
            if(currentTool=="pencil")
            {
                //second click show option
                options[0].style.display="flex";
            }
            else{
                for(let i=0;i<options.length;i++)
                {
                    options[i].style.display="none";
                }
                currentTool="pencil";
                tool.strokeStyle=currentColor;
                tool.lineWidth=pencilSize;
            }
        })
        eraser.addEventListener("click", function(){
            if(currentTool=="eraser")
            {
                options[1].style.display="flex";
            }
            else{
                for(let i=0;i<options.length;i++)
                {
                    options[i].style.display="none";
                }
                currentTool="eraser";
                tool.strokeStyle="white";
                tool.lineWidth=eraserSize;
            }
        })
        rect.addEventListener("click", function(){
            if(currentTool=="rect")
            {
                options[2].style.display="flex";
            }
            else{
                for(let i=0;i<options.length;i++)
                {
                    options[i].style.display="none";
                }
                currentTool="rect";
                tool.strokeStyle=currentColor;
                tool.lineWidth=rectSize;
            }
        })
        line.addEventListener("click", function(){
            if(currentTool=="line")
            {
                options[3].style.display="flex";
            }
            else{
                for(let i=0;i<options.length;i++)
                {
                    options[i].style.display="none";
                }
                currentTool="line";
                tool.strokeStyle=currentColor;
                tool.lineWidth=lineSize;
            }
        })

    let red = document.querySelector(".red");
    let green = document.querySelector(".green");
    let blue = document.querySelector(".blue");
    red.addEventListener("click", function(){
      tool.strokeStyle="red";
      currentColor="red";
    })
    blue.addEventListener("click", function(){
      tool.strokeStyle="blue";
      currentColor="blue";
    })
    green.addEventListener("click", function(){
      tool.strokeStyle="green";
      currentColor="green";
    })

    // drawing mode

    let drawingMode= false;
    let boardTop = canvasBoard.getBoundingClientRect().top;  //this is done to know by how much canvas board is shifted down due to the icons used
    let boardLeft = canvasBoard.getBoundingClientRect().left;
    // console.log(canvasBoard.getBoundingClientRect());
    body.addEventListener("mousedown", function(e){
       iX=e.clientX - boardLeft;  //clientX is the
       iY=e.clientY-boardTop;  //to adjust the height difference created due to shifting of canvas board a little bit down because of the use of icons at the top
    //    console.log(iX , iY);
       if(currentTool=="pencil" ||currentTool=="eraser")
       {
         drawingMode=true;
         tool.beginPath();
         tool.moveTo(e.clientX-boardLeft,e.clientY-boardTop);
       }
    })

    // when the pen is lifted up
    body.addEventListener("mouseup", function(e){
      fX=e.clientX - boardLeft;
      fY=e.clientY-boardTop;   //to adjust the height difference created due to shifting of canvas board a little bit down because of the use of icons at the top
      
      let width=fX-iX;
      let height=fY-iY;
      if(currentTool=="rect")
      {
            tool.strokeRect(iX,iY,width,height);
      }
      else if (currentTool=="line"){
        tool.beginPath();
        tool.moveTo(iX,iY);
        tool.lineTo(fX,fY);
        tool.stroke();
      }
      else if(currentTool=="pencil" || currentTool=="eraser")
      {
        drawingMode=false;
      }
    })
    body.addEventListener("mousemove", function(e){
      if(drawingMode==false)
      return;

      fX=e.clientX-boardLeft;
      fY=e.clientY-boardTop;
      tool.lineTo(fX,fY);
      tool.stroke();
      iX=fX;
      iY=fY;
    })
    //for size change
    let pencilSize=5;
        let eraserSize=5;
        let rectSize=5;
        let lineSize=5;
    let sizeBoxArr= document.querySelectorAll(".size-container");
    // console.log(sizeBoxArr[0]);
     sizeBoxArr[0].addEventListener("click", function(e){
         let elements=["size1","size2","size3","size4","size5"];
         
         let allClasses=e.target.classList;
         console.log("Hello");
        //  console.log(allClasses);
         let firstClass=allClasses[0];
        //   console.log(firstClass);
         let test=elements.includes(firstClass);
         if(test)
         {
             if(firstClass=="size1")
             {
                 pencilSize=3;
                 console.log("Hello1");
             }
             else if(firstClass=="size2")
             {
                pencilSize=6;
                console.log("Hello2");
             }
             else if(firstClass=="size3")
             {
                pencilSize=9;
                console.log("Hello3");
             }
             else if(firstClass=="size4")
             {
                pencilSize=13;
                console.log("Hello4");
             }
             else if(firstClass=="size5")
             {
                pencilSize=16;
                console.log("Hello5");
             }
         }
        //  console.log(pencilSize);
         tool.lineWidth=pencilSize;
        })


        // sticky

        let sticky = document.querySelector("#sticky");
        
        sticky.addEventListener("click", function(){
            // console.log("Hello");
            let sticky = document.createElement("div");
            sticky.setAttribute("class","sticky");
            sticky.innerHTML = ` <div class="navbar">
            <div class="notes">Notes</div>
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <textarea name="text-box" class="write"></textarea>`;

        body.appendChild(sticky);
        let minimize=document.querySelector(".minimize");
        let close=document.querySelector(".close");
        let textArea=document.querySelector(".write");

        let isClose=false;
        minimize.addEventListener("click", function(){
            if(isClose==false)
            textArea.style.display="none";
            else
            textArea.style.display="block";

            isClose=!isClose;
        })
        close.addEventListener("click",function(){
            sticky.remove();
        })

        dragDrop(sticky);
    })

    function dragDrop(sticky){
        sticky.onmousedown = function(event) {

            let shiftX = event.clientX - ball.getBoundingClientRect().left;
            let shiftY = event.clientY - ball.getBoundingClientRect().top;
          
            ball.style.position = 'absolute';
            ball.style.zIndex = 1000;
            document.body.append(ball);
          
            moveAt(event.pageX, event.pageY);
          
            // moves the ball at (pageX, pageY) coordinates
            // taking initial shifts into account
            function moveAt(pageX, pageY) {
              ball.style.left = pageX - shiftX + 'px';
              ball.style.top = pageY - shiftY + 'px';
            }
          
            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
            }
          
            // move the ball on mousemove
            document.addEventListener('mousemove', onMouseMove);
          
            // drop the ball, remove unneeded handlers
            ball.onmouseup = function() {
              document.removeEventListener('mousemove', onMouseMove);
              ball.onmouseup = null;
            };
          
          };
          
          ball.ondragstart = function() {
            return false;
          };
    }