var matrix = [
['!', '!', '!', '!', '!', '!', '!', '!', '!', '!', '!', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '!'],
['!', '!', '!', '!', '!', '!', '!', '!', '!', '!', '!', '!']
];
var mines = 0;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for(y = 1; y <= 10; y++){
	for(x = 1; x <= 10; x++){
		if(random(1, 7) == 6){
			matrix[y][x] = "B";
			mines++;
		}
	}
}

document.title = "Сапёр | Всего мин: "+mines;

for(y = 1; y <= 10; y++){
	for(x = 1; x <= 10; x++){
		var mines = 0;
		if(matrix[(y+1)][x] == "B"){
			mines++;
		}
		if(matrix[(y-1)][x] == "B"){
			mines++;
		}
		if(matrix[y][(x+1)] == "B"){
			mines++;
		}
		if(matrix[y][(x-1)] == "B"){
			mines++;
		}
		if(matrix[(y+1)][(x+1)] == "B"){
			mines++;
		}
		if(matrix[(y+1)][(x-1)] == "B"){
			mines++;
		}
		if(matrix[(y-1)][(x+1)] == "B"){
			mines++;
		}
		if(matrix[(y-1)][(x-1)] == "B"){
			mines++;
		}
		if(mines != 0){
			matrix[y][x] = mines;
		}
	}
}

var field = document.getElementById("field");

field.oncontextmenu = function(){
	return false
}
for(y = 1; y <= 10; y++){
	for(x = 1; x <= 10; x++){
		var item = document.createElement("button")
		item.classList.add("field-item");
		item.setAttribute("x", x);
		item.setAttribute("y", y);
		item.setAttribute("onclick", "openItem(this)");
		item.setAttribute("oncontextmenu", "marker(this)");
		field.appendChild(item);
	}
}

var gameover;

function marker(item){
	if(gameover != "yes"){
		if(item.innerHTML == "✖"){
			item.innerHTML = "";
		}
		else if(!item.classList.contains("open")){
			item.innerHTML = "✖";
		}
		return false;
	}
	else{
		location.reload();
	}
}

function openItem(item){
	if(gameover != "yes"){
		console.log("test");
		var y = +item.getAttribute("y");
		var x = +item.getAttribute("x");
		var color;
		if(matrix[y][x] == "B"){
			alert("Игра окончена!");
			for(y = 1; y <= 10; y++){
				for(x = 1; x <= 10; x++){
					if(matrix[y][x] == "B"){
						var item = document.querySelector('.field-item[x="'+x+'"][y="'+y+'"]');
						item.classList.add("open");
						item.innerHTML = "<img src='https://im0-tub-ru.yandex.net/i?id=75b527197c6c3878b7d9c959b037dfe9&n=13' >";
					}
				}
			}
			gameover = "yes";
		}
		else{

			if(matrix[y][x] == "#" || matrix[y][x] == "-"){
				
				if(matrix[(y+1)][x] == "#" || !isNaN(matrix[(y+1)][x])){
					if(matrix[(y+1)][x] == "#"){
						matrix[(y+1)][x] = "-";
					}
					var nextItem = document.querySelector('.field-item[x="'+x+'"][y="'+(y+1)+'"]');
					openItem(nextItem);
				}
				if(matrix[(y-1)][x] == "#" || !isNaN(matrix[(y-1)][x])){
					if(matrix[(y-1)][x] == "#"){
						matrix[(y-1)][x] = "-";
					}
					var nextItem = document.querySelector('.field-item[x="'+x+'"][y="'+(y-1)+'"]');
					openItem(nextItem);
				}
				if(matrix[y][(x+1)] == "#" || !isNaN(matrix[y][(x+1)])){
					if(matrix[y][(x+1)] == "#"){
						matrix[y][(x+1)] = "-";
					}
					var nextItem = document.querySelector('.field-item[x="'+(x+1)+'"][y="'+y+'"]');
					openItem(nextItem);
				}
				if(matrix[y][(x-1)] == "#" || !isNaN(matrix[y][(x-1)])){
					if(matrix[y][(x-1)] == "#"){
						matrix[y][(x-1)] = "-";
					}
					var nextItem = document.querySelector('.field-item[x="'+(x-1)+'"][y="'+y+'"]');
					openItem(nextItem);
				}
			
				if(!isNaN(matrix[(y+1)][(x+1)])){
					var nextItem = document.querySelector('.field-item[x="'+(x+1)+'"][y="'+(y+1)+'"]');
					openItem(nextItem);
					
				}
				if(!isNaN(matrix[(y+1)][(x-1)])){
					var nextItem = document.querySelector('.field-item[x="'+(x-1)+'"][y="'+(y+1)+'"]');
					openItem(nextItem);
				}
				if(!isNaN(matrix[(y-1)][(x+1)])){
					var nextItem = document.querySelector('.field-item[x="'+(x+1)+'"][y="'+(y-1)+'"]');
					openItem(nextItem);
				}
				if(!isNaN(matrix[(y-1)][(x-1)])){
					var nextItem = document.querySelector('.field-item[x="'+(x-1)+'"][y="'+(y-1)+'"]');
					openItem(nextItem);
				}
			}



			var mines = matrix[y][x];
			if(mines == 1){
				color = "blue";
			}
			else if(mines == 2){
				color = "green";
			}
			else if(mines >= 3){
				color = "red";
			}
			else{
				mines = "";
			}

			item.classList.add("open");
			item.innerHTML = "<b style='color:"+color+"'>"+mines+"</b>";
			return true;

		}
	}
	else{
		location.reload();
	}
}
