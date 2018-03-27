/**
 * Created by Stefan Aleksik on 19.2.2018.
 */

function Avatar(obj) {
    AvatarColors.call(this);
    AvatarStaticBody.call(this);
    AvatarDynamicBody.call(this)
    Grid.call(this);

    this.generateAvatar =function () {
        var static = this.returnStaticElements(obj.avatar);
        var dynamic = this.generateDynamicElemnts(obj);
        var avatar = dynamic.concat(static)
        var grid = this.avatarToGrid(avatar);
        this.render(grid);
    }
}

function AvatarDynamicBody() {
    this.generateEyeBrows = function (x, y) {
        if(x === 1){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 36,
                    endx: 39,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 45,
                    endx: 48,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                }
            ];
            return temp

        }
        else if (x === 0){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 36,
                    endx: 37,
                    starty: 7 - y,
                    endy: 7 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 38,
                    endx: 39,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 45,
                    endx: 46,
                    starty: 7 - y,
                    endy: 7 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 47,
                    endx: 48,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                }
            ];
            return temp
        }
        else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 36,
                    endx: 37,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 38,
                    endx: 39,
                    starty: 7 - y,
                    endy: 7 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 45,
                    endx: 46,
                    starty: 8 - y,
                    endy: 8 - y,
                    color: this.colors.hair
                },
                {
                    bodyPart: {type: 'dynamic', element: 'eyebrow'},
                    startx: 47,
                    endx: 48,
                    starty: 7 - y,
                    endy: 7 - y,
                    color: this.colors.hair
                }
            ];
            return temp
        }
    }
    this.generateEyes = function (x, y) {

        this.leftEye = {
            bodyPart: {type: 'dynamic', element: 'pupil'},
            startx: 36 + x,
            endx: 37 + x,
            starty: 11 - y,
            endy: 12 - y,
            color: this.colors.eye_pupil
        };

        this.rightEye = {
            bodyPart: {type: 'dynamic', element: 'pupil'},
            startx: 45 + x,
            endx:46 + x,
            starty: 11 - y,
            endy: 12 - y,
            color: this.colors.eye_pupil
        };

        return [this.leftEye, this.rightEye]
    };
    this.generateMouth = function (value) {
        if(value === 0){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 40,
                    endx: 44,
                    starty: 17,
                    endy: 17,
                    color: this.colors.mouth
                }];
            return temp
        } else if (value === 1) {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 40,
                    endx: 44,
                    starty: 17,
                    endy: 17,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 41,
                    endx: 43,
                    starty: 18,
                    endy: 18,
                    color: this.colors.mouth
                }];
            return temp
        } else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 39,
                    endx: 45,
                    starty: 17,
                    endy: 17,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 40,
                    endx: 44,
                    starty: 18,
                    endy: 18,
                    color: this.colors.mouth
                },
                {
                    bodyPart: {type: 'dynamic', element: 'mouth'},
                    startx: 41,
                    endx: 43,
                    starty: 19,
                    endy: 19,
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
                    startx: 37,
                    endx: 38,
                    starty: 25,
                    endy: 33,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 46,
                    endx: 47,
                    starty: 25,
                    endy: 33,
                    color: this.colors.skin_light
                }
            ]
            return temp
        }
        else if (value === 2){
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 35,
                    endx: 36,
                    starty: 16,
                    endy: 24,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 48,
                    endx: 49,
                    starty: 16,
                    endy: 24,
                    color: this.colors.skin_light
                }
            ]
            return temp
        } else {
            var temp = [
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 28,
                    endx: 36,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                },
                {
                    bodyPart: {type: 'dynamic', element: 'arm'},
                    startx: 48,
                    endx: 56,
                    starty: 23,
                    endy: 24,
                    color: this.colors.skin_light
                }
            ]
            return temp
        }
    };

    this.avatarScale = function (number) {
        if(number < 38){
            return 0
        } else if (number < 76 && number > 38){
            return 1
        } else {
            return 2
        }
    };

    this.generateDynamicElemnts = function (obj) {
        this.eX = this.avatarScale(obj.song);
        this.eY = this.avatarScale(obj.artist);
        this.aV = this.avatarScale(obj.energy);
        this.mV = this.avatarScale(obj.timePlayed);

        this.eyes = this.generateEyes(this.eX, this.eY);
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
            startx:45,
            endx: 48,
            starty: 9,
            endy: 12,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:36,
            endx: 39,
            starty: 9,
            endy: 12,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:35,
            endx: 49,
            starty: 4,
            endy: 20,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:50,
            endx: 50,
            starty: 10,
            endy: 13,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:34,
            endx: 34,
            starty: 10,
            endy: 13,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:40,
            endx: 44,
            starty: 21,
            endy: 23,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:39,
            endx: 45,
            starty: 22,
            endy: 39,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:37,
            endx: 47,
            starty: 23,
            endy: 24,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:40,
            endx: 41,
            starty: 40,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:43,
            endx: 44,
            starty: 40,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:38,
            endx: 41,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:43,
            endx: 46,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:33,
            endx: 51,
            starty: 1,
            endy: 13,
            color: this.colors.hair},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:32,
            endx: 52,
            starty: 14,
            endy: 16,
            color: this.colors.hair},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:34,
            endx: 50,
            starty: 17,
            endy: 17,
            color: this.colors.hair}
    ];
    this.male = [
        {   bodyPart: {type: 'static', element: 'face'},
            startx:45,
            endx: 48,
            starty: 9,
            endy: 12,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:36,
            endx: 39,
            starty: 9,
            endy: 12,
            color: this.colors.robot_elements},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:35,
            endx: 49,
            starty: 4,
            endy: 20,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:50,
            endx: 50,
            starty: 10,
            endy: 13,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'face'},
            startx:34,
            endx: 34,
            starty: 10,
            endy: 13,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'neck'},
            startx:40,
            endx: 44,
            starty: 21,
            endy: 22,
            color: this.colors.skin},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:39,
            endx: 45,
            starty: 22,
            endy: 33,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'shirt'},
            startx:37,
            endx: 47,
            starty: 23,
            endy: 24,
            color: this.colors.top_part},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:39,
            endx: 45,
            starty: 34,
            endy: 34,
            color: this.colors.belt},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:39,
            endx: 45,
            starty: 35,
            endy: 36,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:43,
            endx: 45,
            starty: 37,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'legs'},
            startx:39,
            endx: 41,
            starty: 37,
            endy: 46,
            color: this.colors.pants},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:43,
            endx: 47,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'shoos'},
            startx:37,
            endx: 41,
            starty: 47,
            endy: 48,
            color: this.colors.shoos},
        {   bodyPart: {type: 'static', element: 'hair'},
            startx:34,
            endx: 50,
            starty: 2,
            endy: 9,
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
        console.log(ids);
        return ids;
    }

    this.colorPixel = function (id, arr) {
        var color = arr.filter(function (obj) {
            return obj.id === id;
        });
        return color
    }

    this.avatarToGrid = function(obj) {
        var data = [], xpos = 0, ypos = 0, width = 5, height = 5, pixels = this.pixelizeAvatar(obj);
        // iterate for rows
        for (var row = 0; row < 50; row++) {
            data.push([]);
            // iterate for cells/columns inside rows
            for (var column = 0; column < 80; column++) {
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

    this.render = function (data) {
        d3.select("#grid")
            .append("svg")
            .attr("width","400px")
            .attr("height","250px")
            .selectAll(".row")
            .data(data)
            .enter().append("g")
            .attr("class", "row")
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

