/**
 * Created by Stefan Aleksik on 19.2.2018.
 */

function Avatar(obj) {
    AvatarColors.call(this);
    AvatarStaticBody.call(this);
    AvatarDynamicBody.call(this);
    Grid.call(this);

    this.generateAvatar =function () {
        var static = this.returnStaticElements(obj.avatar);
        var dynamic = this.generateDynamicElemnts(obj);
        var avatar = dynamic.concat(static);
        var size = this.getWindowSize();
        var grid = this.avatarToGrid(avatar, size.squereSideSize);

        this.render(grid, size);
    }
}

function AvatarDynamicBody() {
    this.generateEyeBrows = function (x, y) {
        if(x === 1){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 8,
                    endx: 11,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 17,
                    endx: 20,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                }
            ];
            return temp

        }
        else if (x === 0){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 8,
                    endx: 9,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 10,
                    endx: 11,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 17,
                    endx: 18,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 19,
                    endx: 20,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                }
            ];
            return temp
        }
        else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 8,
                    endx: 9,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 10,
                    endx: 11,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 17,
                    endx: 18,
                    starty: 9 - y,
                    endy: 9 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 19,
                    endx: 20,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                }
            ];
            return temp
        }
    }
    this.generateEyes = function (x, y) {

        this.leftEye = {
            bodyPart: {type: 'dynamic', element: 'pupil'},
            startx: 8 + x,
            endx: 8 + x,
            starty: 13 - y,
            endy: 13 - y,
            color: this.colors.eye_pupil
        };

        this.rightEye = {
            bodyPart: {type: 'dynamic', element: 'pupil'},
            startx: 17 + x,
            endx:17 + x,
            starty: 13 - y,
            endy: 13 - y,
            color: this.colors.eye_pupil
        };

        return [this.leftEye, this.rightEye]
    };
    this.generateMouth = function (value) {
        if(value === 0){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 12,
                    endx: 16,
                    starty: 18,
                    endy: 18,
                    color: this.colors.mouth
                }];
            return temp
        } else if (value === 1) {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 12,
                    endx: 16,
                    starty: 18,
                    endy: 18,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 13,
                    endx: 15,
                    starty: 19,
                    endy: 19,
                    color: this.colors.mouth
                }];
            return temp
        } else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 11,
                    endx: 17,
                    starty: 18,
                    endy: 18,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 12,
                    endx: 16,
                    starty: 19,
                    endy: 19,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 13,
                    endx: 15,
                    starty: 20,
                    endy: 20,
                    color: this.colors.mouth
                }];
            return temp
        }
    };

    this.generateArms = function (value) {
        if(value === 0){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 9,
                    endx: 10,
                    starty: 25,
                    endy: 33,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 18,
                    endx: 19,
                    starty: 25,
                    endy: 33,
                    color: this.colors.skin_light
                }
            ];
            return temp
        }
        else if (value === 2){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 5,
                    endx: 8,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 20,
                    endx: 23,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 5,
                    endx: 6,
                    starty: 18,
                    endy: 22,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 22,
                    endx: 23,
                    starty: 18,
                    endy: 22,
                    color: this.colors.skin_light
                }
            ];
            return temp
        } else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 0,
                    endx: 8,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 20,
                    endx: 28,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                }
            ];
            return temp
        }
    };

    this.avatarScale = function (number, low, medium) {
        if(number <= low){
            return 0
        } else if (number <= medium && number > low){
            return 1
        } else {
            return 2
        }
    };

    this.avatarEyeScale = function (number, low, lowmedium,medium) {
        if(number <= low){
            return 0
        } else if (number <= lowmedium && number > low){
            return 1
        } else if (number <= medium && number > lowmedium){
            return 2
        } else {
            return 3
        }
    };

    this.generateDynamicElemnts = function (obj) {
        this.eX = this.avatarScale(obj.song, 25, 75);
        this.eY = this.avatarScale(obj.artist, 25, 75);
        this.eyesX = this.avatarEyeScale(obj.song, 25, 50, 75);
        this.eyesY = this.avatarEyeScale(obj.artist, 25, 50, 75);
        this.aV = this.avatarScale(obj.danceability, 50, 78);
        this.mV = this.avatarScale(obj.timePlayed, 34, 67);
        //console.log('this is: ex and ey ' + this.eX + ' ' + this.eY);
        this.eyes = this.generateEyes(this.eyesX, this.eyesY);
        this.eyeBrows = this.generateEyeBrows(this.eX, this.eY);
        this.mouthh = this.generateMouth(this.mV);
        this.arms = this.generateArms(this.aV);

        var temp = this.eyes.concat(this.eyeBrows, this.mouthh,this.arms);

        return temp;
    }

}
function AvatarStaticBody() {
    this.female = [
        {   bodyPart: {type: 'static', element: 'face'},
            startx:17,
            endx: 20,
            starty: 10,
            endy: 13,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:8,
            endx: 11,
            starty: 10,
            endy: 13,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:7,
            endx: 21,
            starty: 5,
            endy: 21,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:22,
            endx: 22,
            starty: 11,
            endy: 14,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:6,
            endx: 6,
            starty: 11,
            endy: 14,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:12,
            endx: 16,
            starty: 22,
            endy: 24,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:13,
            endx: 15,
            starty: 25,
            endy: 25,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:14,
            endx: 14,
            starty: 26,
            endy: 26,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:11,
            endx: 17,
            starty: 23,
            endy: 38,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:9,
            endx: 19,
            starty: 23,
            endy: 24,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:12,
            endx: 13,
            starty: 39,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:15,
            endx: 16,
            starty: 39,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:10,
            endx: 13,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:15,
            endx: 18,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:5,
            endx: 23,
            starty: 2,
            endy: 14,
            color: this.colors.hair},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:4,
            endx: 24,
            starty: 15,
            endy: 17,
            color: this.colors.hair},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:6,
            endx: 22,
            starty: 18,
            endy: 18,
            color: this.colors.hair}
    ];
    this.male = [
        {   bodyPart: {type: 'static', element: 'face'},
            startx:17,
            endx: 20,
            starty: 10,
            endy: 13,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:8,
            endx: 11,
            starty: 10,
            endy: 13,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:7,
            endx: 21,
            starty: 5,
            endy: 21,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:22,
            endx: 22,
            starty: 11,
            endy: 14,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:6,
            endx: 6,
            starty: 11,
            endy: 14,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:12,
            endx: 16,
            starty: 22,
            endy: 22,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:13,
            endx: 15,
            starty: 23,
            endy: 23,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:14,
            endx: 14,
            starty: 24,
            endy: 24,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:11,
            endx: 17,
            starty: 22,
            endy: 33,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:9,
            endx: 19,
            starty: 23,
            endy: 24,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:11,
            endx: 17,
            starty: 34,
            endy: 34,
            color: this.colors.belt},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:11,
            endx: 17,
            starty: 35,
            endy: 36,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:15,
            endx: 17,
            starty: 37,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:11,
            endx: 13,
            starty: 37,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:15,
            endx: 19,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:9,
            endx: 13,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:6,
            endx: 22,
            starty: 3,
            endy: 10,
            color: this.colors.hair}

    ];

    this.returnStaticElements = function (string) {
        //var temp = string === 'male'? this.maleStatic : this.femaleStatic;
        return this[string]
    }

}
function AvatarColors() {
    this.colors = {
        hair: '#231F20',
        skin: '#F7A682',
        skin_light: '#FFBD99',
        top_part: '#23385F',
        pants: '#222220',
        shoos: '#82A0C3',
        belt: '#402016',
        robot_body:'#151515',
        robot_face:'#2D2D2B',
        robot_elements: '#fff',
        eye_pupil: '#00A451',
        mouth: '#CC3333'
    };
}
function Grid() {
    this.pixelizeAvatar =function (obj){
        var ids = [];
        obj.forEach(function (p1) {
            for(var row = p1.startx; row <= p1.endx; row++){
                for (var col = p1.starty; col <= p1.endy; col++){
                    var color = p1.color;
                    var id = 'X' + row.toString() + 'Y' + col.toString();
                    ids.push({id: id, color: color})
                }
            }
        });
        //console.log(ids);
        return ids;
    }

    this.colorPixel = function (id, arr) {
        var color = arr.filter(function (obj) {
            return obj.id === id;
        });
        return color
    }
    this.getWindowSize = function () {
        var width = $('#grid').width();
        var squereSideSize = Math.floor(width/28);
        var svgWidth = 29*squereSideSize;
        var svgHeight = 49*squereSideSize;

        return {squereSideSize: squereSideSize, svgWidth: svgWidth, svgHeight: svgHeight}

    }
    this.avatarToGrid = function(obj, squareSize) {
        var data = [], xpos = 0, ypos = 0, width = squareSize, height = squareSize, pixels = this.pixelizeAvatar(obj);
        // iterate for rows
        for (var row = 0; row < 49; row++) {
            data.push([]);
            // iterate for cells/columns inside rows
            for (var column = 0; column < 28; column++) {
                var posID = 'X' + column.toString() +'Y' + row.toString(),
                    color = this.colorPixel(posID, pixels);
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    posID: posID,
                    color: color.length > 0? color[0].color : "#fff"
                    //test.includes(posID)? '#04160f': "#fff"
                });
                // increment the x position. I.e. move it over by 50 (width variable)
                xpos += width;
            }
            // reset the x position after a row is complete
            xpos = 0;
            // increment the y position for the next row. Move it down 50 (height variable)
            ypos += height;
        }
        return data;
    };


    this.render = function (data, obj) {
        d3.select("#grid")
            .append("svg")
            .attr("width", obj.svgWidth)
            .attr("height",obj.svgHeight)
            .style("fill", '#fff')
            .selectAll(".roww")
            .data(data)
            .enter().append("g")
            .attr("class", "roww")
            .selectAll(".square")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("class","square")
            .attr('id', function (d) { return d.posID })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .style("fill", '#fff')
            .attr('shape-rendering', 'crispEdges')
            .transition()
            .duration(500)
            .style("fill", function (d) { return d.color;  });
    }
}

