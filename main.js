let iskin = false;
let prezent_show = false;
let ship = true;
const mainBody = new Vue({
	el:'#body_main',
	data:{
		 iskin: false,
		 prezent_show: false,
         ship: true,
	}
})
const respectInfo = new Vue({
	el:'#respect--info',
	data:{  respStr:'306',
			respProc:10
			},
	methods:{
		setRespect(elem){
			this.respStr = elem
			this.respProc = 100/500*Number(elem)
		},
		toggleResp(num){
			if(confirm('Вы действительно хотите изменить значение респекта персонажа Рубедо?'))
			{
				var req = new Subsys_JsHttpRequest_Js()
					req.onreadystatechange = function()
				{
					if (req.readyState == 4)
					{
						show_result(req.responseJS.text);
					}
				}
				req.open('POST', 'http://foggystation.starcombats.com/ajax/info/info_respect.php', true);
				req.send({id: 1409213, respect: num, ix: Math.random()});
					
			this.respStr = Number(this.respStr) + num
			this.respProc = 100/500*Number(this.respStr)
			}
		}
	},
	template:`<div id="respect--info">
			<span>Респектометр: <i>{{ respStr }}</i> ед.</span>
			<div class="respect_info--container">
				<div class="respect_plus" @click="toggleResp(1)">+</div>
				<div class="respect_indicator--plus" v-bind:style="{width: respProc+'%'}"></div>
				<div class="respect_indicator--minus" v-bind:style="{width: 100-respProc +'%'}"></div>
				<div class="respect_minus" @click="toggleResp(-1)">-</div>
			</div>
		</div>`
})

const propertyElements = new Vue({
	el:'#info__property',
	data:{
		propertyList:[],
		propertyImg:[
			{name:'states',
				url:'http://img.starcombats.com/characteristics/inf2.gif',
				title:'Статы корабля'},
			{name:'specifications',
				url:'http://img.starcombats.com/characteristics/bonus2.gif',
				title:'Характеристики корабля'},
			{name:'statistic',
				url:'http://img.starcombats.com/characteristics/level_up.gif',
				title:'Статистика боёв'},
			{name:'statistica',
				url:'http://img.starcombats.com/characteristics/bonus1.gif',
				title:'Статистика заданий'}
		]
	},
	methods:{
		disp(act){
			var getImg = this.propertyImg
			for (var i = 0; i < getImg.length; i++) {
				var disId = getImg[i].name 
				if (act===disId) {
					document.querySelector('#stats-title img').src = getImg[i].url
					document.querySelector('#stats-title span').textContent = getImg[i].title
				}
			}
			getPropertyList(act)
		},
		obnov(elem){
			if (elem) {
				this.propertyList=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.propertyList.push(objEl)
				}
			}
		}
	},
	template:`<section id="info__property">
				<div id="property__bar">
                    <img v-for="elem in propertyImg" :src="elem.url" :alt="elem.title"
                        :title="elem.title" @click="disp(elem.name)">
                </div>
				<ul class="property_display-show">
                    <li v-for="el in propertyList">
                    <span>{{el.name}}</span>
                    <span>{{el.val}}</span>
                    </li>
                </ul>
			</section>`
})

const topsElemets = new Vue({
	el:'#info__top',
	data:{
		elemBar:[],
		topList:[],
		rotateImg:true
		},
	methods:{
		getTop(top){
			document.querySelector('#top_info-title span').textContent=top.title
			document.querySelector('#top_info-title img').src=top.url
			document.querySelector('#top_info-title img').title=top.title
			gettopList()
		},
		setElemBar(elem){
			if (elem) {
				this.getImg=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.elemBar.push(objEl)
				}
				if (this.elemBar.length<5) {
					this.rotateImg = true
				} else { this.rotateImg = false }
			}
		},
		setTopList(elem){
			if (elem) {
				this.topList=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.topList.push(objEl)
				}
			}
		}
	},
	template:`<section id="info__top">
				<ul class="top_display--list">
					<li v-for="pers in topList">
						<div>            
							<span>{{pers.num+" "}}</span>
							<img class="top_display--list_clan" :src="pers.klanImg" alt="">
							<img class="top_display--list_sklon" :src="pers.sklonImg" alt="">
							<span>{{pers.name}}</span>
							<img class="top_display--list_info" :src="pers.urlInfo" alt="">
						</div>
						<span>{{pers.stats}}</span>
					</li>
	  			</ul>
				<div id="top-bar">
					<img v-for="im in elemBar" @click="getTop(im)" :src="im.url" :alt="im.alt" :title="im.title" v-bind:class="{rotat_topimg:rotateImg}">
	  			</div>
			</section>`
})

const iskinDisplay = new Vue({
	el:'#info__iskin',
	data:{
		ii:[],
		plagin:[],
		neyro:[],
		ava:'',
		indicat:'',
		status: true
	},
	methods:{
		loadData(response){
				if (response) {
				this.ii=[]
				this.ii.push(response)
				this.ava = 'http://img.starcombats.com/avatars/2/ii_'+ response.virus_avatar +'.gif'
				let imgip,curren,maxcu,nameip=''
				ind=0
				this.plagin=[]
				this.neyro=[]
				for (let [key, value] of Object.entries(response)) {
    				//objEl.push(`${key}`,`${value}`)
    				if (key[7]!=ind&&key[0]==='p'&&key[10]==='m') {
    					imgip ='http://img.starcombats.com/programs/' + value + '.gif'
    					//console.log(`${key}:${value}`)
    				} else if (key[0]==='p'&&key[14]==='c'){
    					curren=value
    				} else if (key[0]==='p'&&key[14]==='m'){
    					maxcu=value
    				} else if ((key[0]==='p'&&key[9]==='n')){
    					nameip=value;
    					if (Number(ind)<=4) {
    					this.plagin.push({plimg:imgip, name: nameip+' ('+curren+'/'+maxcu+')'})
    					} else {
    					this.neyro.push({plimg:imgip, name: nameip+' ('+curren+'/'+maxcu+')'})	
    					}
    				} 
    				ind=Number(key[7])
			 	}
			 	this.indicat = 'width: '+ (100/Number(response.energy_max)*Number(response.energy_current))+'%'
			}
			this.status=true
			shipDisplay.status=false
		}
	},
	template:`<section v-if="status" id="info__iskin">
            <div class="info_iskin--plagin" >
                <div v-for="(pl,index) in plagin" class="glass">
                    <img :src="pl.plimg" :alt="pl.name" :title="pl.name">
                </div>
            </div>
            <div class="info_iskin--body" v-for="im in ii">
                <div class="iskin_state--en indicator_info">
                    <img src="info_img/ENicon.png" alt="энергия" width="14" height="10">
                    <div class="info--en_indicator">
                        <div :style="indicat" class="indicator_blue"></div>
                    </div>
                    <span>90/90</span>
                </div>
                <img id="iskin_img" class="glass" :src="ava" :alt="ii.virus_name" :title="ii.virus_name">
            </div>
            <div class="info_iskin--plagin2" >
                <div v-for="(pl,index) in neyro" class="glass">
                    <img :src="pl.plimg" :alt="pl.name" :title="pl.name">
                </div>
            </div>
            <div class="info_iskin--state" v-for="stat in ii">
                <ul class="iskin_state--parameter">
                    <li><span>емкость: {{stat.virus_capacity}}</span> <span>интеллект: {{stat.virus_intelligence}}</span></li>
                    <li><span>скорость: {{stat.virus_speed}}</span> <span>тактика: {{stat.virus_tactics}}</span></li>
                    <li><span>Поражения: {{stat.virus_loses}}</span> <span>Победы: {{stat.virus_victories}}</span></li>
                </ul>
            </div>
            <div class="iskin_name" v-for="ik in ii" >
				<div>Имя искина: <span>{{ik.virus_name}} ({{ik.virus_level}})</span></div>
				<div>Дата создания: <span>{{ik.virus_born}}</span></div>
			</div>
        </section>`
})

const shipDisplay = new Vue({
	el:'#info__ship',
	data:{
		leftBar:[],
		rightBar:[],
		moduls:[],
		craft_img:'',
		status:false
	},
	methods:{
		setElemint(resp){
			this.craft_img = './info_img/'+ resp.craft_img +'.gif'
				//let nam,url,lvl,stt,up,mod,cur,max=''
				ind=0
				let obj={}
				this.leftBar=[]
				this.rightBar=[]
				this.moduls=[]
				let arrayData=[]
			for (let [key, value] of Object.entries(resp)) {
				var name='';
				for(var i=0;i<4;i++){
						name = name + key[i]
				}
				switch (name) {
					case 'gun1':
					case 'navi':
					case 'comp':
					case 'shie':
						arrayData[ind]=value
						obj={name:arrayData[0],url:arrayData[1],
						lvl:arrayData[2],status:arrayData[3],up:arrayData[4],
						modif:arrayData[5], life_cur:arrayData[6],life_max:arrayData[7]}
						if(obj.up==='0'){obj.up=''}else{obj.up='(UP)'}
						if(obj.modif==='0'){obj.modif=''}else{obj.modif='Встроен имплантант'}
						if(7===ind){
							this.leftBar.push(obj)
							ind=0
						} else {ind++}
						break;
					case 'gun2':
					case 'rada':
					case 'reac':
					case 'engi':
						arrayData[ind]=value
						obj={name:arrayData[0],url:arrayData[1],
						lvl:arrayData[2],status:arrayData[3],up:arrayData[4],
						modif:arrayData[5], life_cur:arrayData[6],life_max:arrayData[7]}
						if(obj.up==='0'){obj.up=''}else{obj.up='(UP)'}
						if(obj.modif==='0'){obj.modif=''}else{obj.modif='Встроен имплантант'}
						if(7===ind){
							this.rightBar.push(obj)
							ind=0
						} else {ind++}
						break;
					case 'mod1':
					case 'mod2':
					case 'mod3':
						arrayData[ind]=value
						obj={name:arrayData[0],url:arrayData[1],
						lvl:arrayData[2],status:arrayData[3],up:arrayData[4],
						modif:arrayData[5], life_cur:arrayData[6],life_max:arrayData[7]}
						if(obj.up==='0'){obj.up=''}else{obj.up='(UP)'}
						if(obj.modif==='0'){obj.modif=''}else{obj.modif='Встроен имплантант'}
						if(7===ind){
							this.moduls.push(obj)
							ind=0
						} else {ind++}
						break;
					default:
						ind=0
						break;
				}
			}
			this.status=true
			iskinDisplay.status=false
		}
	},
	template:`<section v-if="status" id="info__ship">
            <div class="ship--left_bar">
                <div v-for="part in leftBar" class="glass">
                     <img :src="part.url"  :alt="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif" :title="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif">
                </div>
            </div>
            <div class="ship--body">
                <div class="ship_body glass" >
                    <img :src="craft_img">
                </div>
                <div class="ship_body--moduls" >
                    <div v-for="part in moduls" class="glass">
                            <img :src="part.url" width="30" height="30" :alt="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif" :title="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif">
                    </div>
                </div>
            </div>
            <div class="ship--right_bar">
                <div v-for="part in rightBar" class="glass">
                        <img :src="part.url" :alt="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif" :title="part.name +' ('+ part.life_cur+'/'+part.life_max+') '+ part.modif">
                </div>
            </div>
            <div id="ship--part"></div>
        </section>`
})
const messageWin = new Vue({
	el:'#message_sistem',
	data:{ 
		message:'',
		image:'',
		status: false,
		obrText:[],
	},
	methods:{
		setMessage(mes,res){
			var lit = 0;
			this.message = '';
				clearInterval(this.obrText)
				this.obrText = setInterval(()=>{
					if (mes.length>lit){
						this.message += mes[lit]
						this.status = res
						lit++
					} else {
						clearInterval(this.obrText)}
				}, 10)			
		},
		closeMes(){
			this.message=''
			this.status = false
			clearInterval(this.obrText)
		}
	},
	template:`<div v-if="status" id="message_sistem">
        			<img src="info_img/warning.gif">
        			<p style="padding: 0px 30px;filter: drop-shadow(0px 1px 5px #9AD5F2);">{{message}}</p>
        			<button @click="closeMes()">Закрыть сообщение</button>
    		  </div>`
})

setTimeout(()=>{
			topsElemets.setElemBar([
				{url:"http://img.starcombats.com/top/top100.gif",
						alt:'Топ 100',
						title:'Топ 100'},
				{url:'http://img.starcombats.com/top/vip.gif',
						alt:'Характеристики корабля',
						title:'Топ VIP'},
				{url:'http://img.starcombats.com/top/viruses.gif',
						alt:'Статистика боёв',
						title:'Топ Искин'},
				{url:'http://img.starcombats.com/top/healings.gif',
						alt:'Статистика квестов',
						title:'Топ Мастер'}
				])
				messageWin.setMessage(`Мир Звездных Боев, или "StarCombats" - это онлайновая RPG игра, посвященная космическим сражениям.
						 Мы постарались сделать игру, которая жила бы своей жизнью и развивалась бы вместе с игроками и так, как хотят игроки.`,true)
 		},3000)
let gettopList=()=>{
	var responList =[
				 {num:'1',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Легенда',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'300'},
				 {num:'2',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Снеговик_',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'150'},
				 {num:'3',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Картошка',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'148'},
				 {num:'4',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'котХ',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'132'},
				 {num:'5',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Мурка',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'50'},
				 {num:'6',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'ТАИАР',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'49'},
				 {num:'7',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Жора',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'38'},
				 {num:'8',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Саня',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'25'},
				 {num:'9',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Саша',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'18'},
				 {num:'10',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Гога',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'12'}
		]
	topsElemets.setTopList(responList)
}
let getPropertyList=(nameList)=>{
		var statesList = []
			switch(nameList){
			case 'states':
				statesList=[{name:'Мощность:',val:'293 (3+290)'},
                    {name:'Маневренность:',val:'143 (3+140)'},
                    {name:'Точность:',val:'143 (3+140)'},
                    {name:'Надежность:',val:'90 (90)'},
                    {name:'Энергоемкость:',val:'743 (3+740)'},
                    {name:'Интеллект:',val:'590 (0+590)'},
                    {name:'Псионика:',val:'590 (0+590)'},
                    {name:'Мастерство:',val:'6117 (2127+3990)'},
                    {name:'Воля:',val:'0 (0)'},
                    {name:'Божественность:',val:'0 (0)'}]
					break
			case 'specifications':
				messageWin.setMessage('Данная информация доступна только игроку или администрации',true)
                    break
            case 'statistic':
            	statesList=[]
            		messageWin.setMessage('Игрок заблокировал возможность просмотра данной информации!',true)
            		break
            	default:
            		statesList=[]
            		break
			}
		propertyElements.obnov(statesList)
}
let top_id_show =()=>{
	
}

function iskin_req()
{ 
  var respons =  { 'virus_name': 'Пролог7','virus_level': '7','virus_born': '2023-09-05 18:59:52','virus_capacity': '1','virus_speed': '25','virus_tactics': '0','virus_intelligence': '0','virus_victories': '1134','virus_loses': '506','virus_avatar': '3','program1_img': 'void','program1_id': '1','program1_life_current': '0','program1_life_max': '0','program1_name': 'Плагин','program2_img': 'void','program2_id': '1','program2_life_current': '0','program2_life_max': '0','program2_name': 'Плагин','program3_img': 'void','program3_id': '1','program3_life_current': '0','program3_life_max': '0','program3_name': 'Плагин','program4_img': 'void','program4_id': '1','program4_life_current': '0','program4_life_max': '0','program4_name': 'Плагин','program5_img': 'void','program5_id': '1','program5_life_current': '0','program5_life_max': '0','program5_name': 'Плагин','program6_img': 'void','program6_id': '1','program6_life_current': '0','program6_life_max': '0','program6_name': 'Плагин','program7_img': 'void','program7_id': '1','program7_life_current': '0','program7_life_max': '0','program7_name': 'Плагин','program8_img': 'void','program8_id': '1','program8_life_current': '0','program8_life_max': '0','program8_name': 'Плагин','energy_max': '10','energy_current': '10' }

 var moy = { 'virus_name': 'нечаянно',
  'virus_level': '10',
  'virus_born': '2011-12-16 17:11:10',
  'virus_capacity': '9',
  'virus_speed': '42',
  'virus_tactics': '8',
  'virus_intelligence': '64',
  'virus_victories': '7681',
  'virus_loses': '3203',
  'virus_avatar': '127',
  'program1_img': 'ai_health4_e',
  'program1_id': '116',
  'program1_life_current': '4',
  'program1_life_max': '20',
  'program1_name': 'Нанобот v.4.2',
  'program2_img': 'ai_healtspan_e',
  'program2_id': '115',
  'program2_life_current': '8',
  'program2_life_max': '20',
  'program2_name': 'Нанобот v.3.2',
  'program3_img': 'ai_energy3_e',
  'program3_id': '121',
  'program3_life_current': '3',
  'program3_life_max': '15',
  'program3_name': 'Аккумулятор v.3.2',
  'program4_img': 'ai_health6',
  'program4_id': '82',
  'program4_life_current': '11',
  'program4_life_max': '20',
  'program4_name': 'Нанобот v.6.1',
  'program5_img': 'decplug_7',
  'program5_id': '62',
  'program5_life_current': '104',
  'program5_life_max': '140',
  'program5_name': 'Extended Plug v.1.3',
  'program6_img': 'grady_7',
  'program6_id': '60',
  'program6_life_current': '59',
  'program6_life_max': '70',
  'program6_name': 'Мультипликатор 1.0',
  'program7_img': 'grady_7',
  'program7_id': '60',
  'program7_life_current': '59',
  'program7_life_max': '70',
  'program7_name': 'Мультипликатор 1.0',
  'program8_img': 'grady_7',
  'program8_id': '60',
  'program8_life_current': '59',
  'program8_life_max': '70',
  'program8_name': 'Мультипликатор 1.0',
  'energy_max': '90',
  'energy_current': '90' }
//   for (let [key, value] of Object.entries(respons)) {
//    // console.log(`${key}:${value}`);
//     objEl.push(`${key}`,`${value}`)
// 	}
// 	responst = []
// 	for (var i = 0; i < objEl.length; i+2) {
// 		var name = objEl[i]
// 		var conten = objEl[i+1]
// 		var cd = {name:conten}
// 		responst.push(cd)
// 	}
// console.log(respons)
 iskinDisplay.loadData(respons)
}
function ship_req(){
	let respons={
		'craft_img':'Snow_ship_anim1',
	'gun1_name':'Лазер Порядка','gun1_url':'http://img.starcombats.com/things_new/art_laser1_to20.gif',
		'gun1_lvl':'(20)','gun1_status':'(артефакт)','gun1_up':'1',
		'gun1_modif':'1', 'gun1_life_current':'860','gun1_life_max':'5000',
	'gun2_name':'Лазер Порядка','gun2_url':'http://img.starcombats.com/things_new/art_laser1_to20.gif',
		'gun2_lvl':'(20)','gun2_status':'(артефакт)','gun2_up':'1',
		'gun2_modif':'1', 'gun2_life_current':'860','gun2_life_max':'5000',
	'navig_name':'Frequency Targeting','navig_url':'http://img.starcombats.com/things_new/n_1166_to20.gif',
		'navig_lvl':'(20)','navig_status':'(артефакт)','navig_up':'0',
		'navig_modif':'1', 'navig_life_current':'860','navig_life_max':'5000',
	'comp_name':'Лазер Порядка','comp_url':'http://img.starcombats.com/things_new/cc_06_c1_to20.gif',
		'comp_lvl':'(20)','comp_status':'(артефакт)','comp_up':'0',
		'comp_modif':'0', 'comp_life_current':'860','comp_life_max':'5000',
	'radar_name':'Лазер Порядка','radar_url':'http://img.starcombats.com/things_new/rr_1665_c35_to20.gif',
		'radar_lvl':'(20)','radar_status':'(артефакт)','radar_up':'0',
		'radar_modif':'0', 'radar_life_current':'860','radar_life_max':'5000',
	'react_name':'Frequency Targeting','react_url':'http://img.starcombats.com/things_new/rr_166_c33_to20.gif',
		'react_lvl':'(20)','react_status':'(артефакт)','react_up':'0',
		'react_modif':'1', 'react_life_current':'860','react_life_max':'5000',
	'shield_name':'Лазер Порядка','shield_url':'http://img.starcombats.com/things_new/rsh_1555_to20.gif',
		'shield_lvl':'(20)','shield_status':'(артефакт)','shield_up':'0',
		'shield_modif':'1', 'shield_life_current':'860','shield_life_max':'5000',
	'engine_name':'Лазер Порядка','engine_url':'http://img.starcombats.com/things/re_1555_to20.gif',
		'engine_lvl':'(20)','engine_status':'(артефакт)','engine_up':'0',
		'engine_modif':'1', 'engine_life_current':'860','engine_life_max':'5000',
	'mod1_name':'Лазер Порядка','mod1_url':'http://img.starcombats.com/things_new/arch_mod_20_Mihai.gif',
		'mod1_lvl':'(20)','mod1_status':'(артефакт)','mod1_up':'0',
		'mod1_modif':'0', 'mod1_life_current':'860','mod1_life_max':'5000',
	'mod2_name':'Лазер Порядка','mod2_url':'http://img.starcombats.com/things_new/arch_gv_mod_20_Miha.gif',
		'mod2_lvl':'(20)','mod2_status':'(артефакт)','mod2_up':'0',
		'mod2_modif':'1', 'mod2_life_current':'860','mod2_life_max':'5000',
	'mod3_name':'Лазер Порядка','mod3_url':'http://img.starcombats.com/things_new/arch_mod_20_Miha.gif',
		'mod3_lvl':'(20)','mod3_status':'(артефакт)','mod3_up':'0',
		'mod3_modif':'1', 'mod3_life_current':'860','mod3_life_max':'5000'}
	shipDisplay.setElemint(respons)
}
/*{ 'count': 2,'items': [ { 
	'item_id': '5418535',
	'life_max': '5000',
	'life_current': '219',
	'flag_gifted': '1',
	'endtime': '-1701933929',
	'flag_repair': '0',
	'destiny': '1189944',
	'clan_destiny': '0',
	'flag_impact': '0',
	'flag_block': '0',
	'flag_artefact': '1',
	'flag_mdouble_damage': '0',
	'flag_double_damage': '0',
	'destiny_name': 'Снеговик_',
	'destiny_clan_img': '',
	'destiny_clan_name': '',
	'kit_name': 'Кит Звездных Боев',
	'kit_amount': '8',
	'inside': 'Встроен <img src=\"http://img.starcombats.com/scrolls/p_ephirwhirl_2_vip.gif\" alt=\"Ether Web VIP\">  (Использований в бою: 25)',
	'img': 'sc_radar',
	'money': '20000.00',
	'euro': '0.00',
	'need_tendency': '127',
	'need_tendency_sub': '0',
	'need_level': '8',
	'need_power': '0',
	'need_mobility': '0',
	'need_computerizing': '0',
	'need_reliability': '0',
	'need_energycapacity': '0',
	'need_intelligence': '0',
	'need_psiability': '0',
	'need_skill': '0',
	'need_will': '0',
	'need_divinity': '0',
	'mod_hp': '2500',
	'mod_energy': '0',
	'mod_critical': '0',
	'mod_anticritical': '500',
	'mod_turn': '300',
	'mod_antiturn': '0',
	'mod_armor_bow': '350',
	'mod_armor_stern': '350',
	'mod_armor_left': '350',
	'mod_armor_right': '350',
	'mod_contrattack': '0',
	'mod_defence': '300',
	'mod_criticalpower': '0',
	'mod_antidefence': '500',
	'mod_damagepower': '500',
	'mod_damage_resist': '0',
	'mod_magic_resist': '0',
	'mod_damage_min': '0',
	'mod_damage_max': '0',
	'mod_power': '0',
	'mod_mobility': '0',
	'mod_computerizing': '0',
	'mod_reliability': '0',
	'mod_energycapacity': '100',
	'mod_intelligence': '100',
	'mod_psiability': '100',
	'mod_skill': '300',
	'mod_will': '0',
	'mod_divinity': '0',
	'name': 'Радар Звездных Боев',
	'tendency_desc': '',
	'tendency_sub_desc': '',
	'burn_count': '0',
	'mod_burn_min': '0',
	'mod_burn_max': '0' }*/
/*Subsys_JsHttpRequest_Js.dataReady(
  '0', // this ID is passed from JavaScript frontend
  '',
  { 'virus_name': 'нечаянно',
  'virus_level': '10',
  'virus_born': '2011-12-16 17:11:10',
  'virus_capacity': '9',
  'virus_speed': '42',
  'virus_tactics': '8',
  'virus_intelligence': '64',
  'virus_victories': '7681',
  'virus_loses': '3203',
  'virus_avatar': '127',
  'program1_img': 'ai_health4_e',
  'program1_id': '116',
  'program1_life_current': '4',
  'program1_life_max': '20',
  'program1_name': 'Нанобот v.4.2',
  'program2_img': 'ai_healtspan_e',
  'program2_id': '115',
  'program2_life_current': '8',
  'program2_life_max': '20',
  'program2_name': 'Нанобот v.3.2',
  'program3_img': 'ai_energy3_e',
  'program3_id': '121',
  'program3_life_current': '3',
  'program3_life_max': '15',
  'program3_name': 'Аккумулятор v.3.2',
  'program4_img': 'ai_health6',
  'program4_id': '82',
  'program4_life_current': '11',
  'program4_life_max': '20',
  'program4_name': 'Нанобот v.6.1',
  'program5_img': 'decplug_7',
  'program5_id': '62',
  'program5_life_current': '104',
  'program5_life_max': '140',
  'program5_name': 'Extended Plug v.1.3',
  'program6_img': 'grady_7',
  'program6_id': '60',
  'program6_life_current': '59',
  'program6_life_max': '70',
  'program6_name': 'Мультипликатор 1.0',
  'program7_img': 'grady_7',
  'program7_id': '60',
  'program7_life_current': '59',
  'program7_life_max': '70',
  'program7_name': 'Мультипликатор 1.0',
  'program8_img': 'grady_7',
  'program8_id': '60',
  'program8_life_current': '59',
  'program8_life_max': '70',
  'program8_name': 'Мультипликатор 1.0',
  'energy_max': '90',
  'energy_current': '90' }
)*/