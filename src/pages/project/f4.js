function polynomialHash(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
	  hash = (hash << 5) - hash + name.charCodeAt(i);
	  hash |= 0;
	}
	return Math.abs(hash);
}
	
function rdSeed(seed) {
	return function() {
	  seed = (seed * 9797 + 908141) % 233280;
	  return seed / 233280;
	};
}
	
const genderList = ['男', '女', '双性', '无性', '随意切换'];
const categoryData = [
	{type: '宅家系', emoji: '(￣﹏￣)'},
	{type: '魔王系', emoji: 'ψ(｀∇´)ψ'},
	{type: '性感系', emoji: 'ღ(´･ᴗ･`)'},
	{type: '冷淡系', emoji: '_(:3 」∠)_'},
	{type: '神秘系', emoji: '◔_◔'},
	{type: '活泼系', emoji: '٩(◕‿◕)۶'},
	{type: '可爱系', emoji: '(≧ω≦)/'},
	{type: '憨憨系', emoji: '(•ิ_•ิ)?'}
];
const haircolor = ['玄黑色','银白色','酒红色','珊瑚粉','翡翠绿','琉璃蓝','琥珀金','薄藤紫','砂金色','墨玉灰'];
const hobbies = ['口交', '足交', '乳交', '自慰', '捆绑', '肛交', 'SM'];
const abilities = ['接受任意尺寸插入', '随时发情', '体液可催淫', '随时释放荷尔蒙', '精神控制', '化身榨精能人', '记忆修改'];
const sensitive = ['屁股', '肛门', '乳头', '耳垂', '腋下', '大腿内侧', '腰部', '生殖器', '嘴唇', '足部'];
const sexlines = ['爱心', '杯子', '黑桃', '蝙蝠双翼', '剑', '藤蔓', '茶壶', '奶瓶'];
	
export function divine(name) {
	const seed = polynomialHash(name);
	const rand = rdSeed(seed);
	const gen = (min, max, precision=1) => 
		Number((min + rand()*(max-min)).toFixed(precision));

	const category = categoryData[Math.floor(rand()*8)],
		s = gen(1,100,2),
		height = gen(105, 245),
		hairColor = haircolor[Math.floor(rand()*10)],
		experiencePeople = Math.floor(110 + rand()*991), 
		sexDesire = Math.floor(110 + rand()*991),
		hobby = hobbies[Math.floor(rand()*7)],
		ability = abilities[Math.floor(rand()*7)],
		rating = gen(0,5),
		sensitivePos = sensitive[Math.floor(rand()*10)],
		sexLine = sexlines[Math.floor(rand()*8)],
		climaxPr = (category.type === "冷淡系" ? `${gen(-100000, 100, 0)}‰` : `${gen(0, 1000, 0)}%`);
	
	const underbust = gen(70, 110),
		bust = gen(underbust + 10, underbust + 25),
		waist = gen(underbust * 0.6, underbust * 0.75),
		hip = gen(bust * 0.8, bust * 1.1),
		cupTable = [
			{ diff: 10, cup: 'A' },
			{ diff: 12.5, cup: 'B' },
			{ diff: 15, cup: 'C' },
			{ diff: 17.5, cup: 'D' },
			{ diff: 20, cup: 'E' },
			{ diff: 22.5, cup: 'F' },
			{ diff: 25, cup: 'G' },
			{ diff: 27.5, cup: 'H' },
			{ diff: 30, cup: 'I' },
			{ diff: 32.5, cup: 'J' },
			{ diff: 35, cup: 'K' },
			{ diff: 37.5, cup: 'L' },
			{ diff: 40, cup: 'M' },
			{ diff: 42.5, cup: 'N' },
			{ diff: 45, cup: 'O' },
			{ diff: 47.5, cup: 'P' },
		];
	
	const exp7days = [], today = new Date();
	for (let i = 6; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(today.getDate() - i);
		const yyyy = d.getFullYear(),
			  mm = String(d.getMonth() + 1).padStart(2, '0'),
			  dd = String(d.getDate()).padStart(2, '0');
		const dateStr = `${yyyy} ${mm} ${dd}`;
		exp7days.push({"日期": dateStr, "人数": gen(0, 2000, 0)});
	}
	let cup = 'A';
	for (let i = cupTable.length - 1; i >= 0; i--) {
		if (bust - underbust >= cupTable[i].diff) {
			cup = cupTable[i].cup;
			break;
		}
	}
	
	// @ts-ignore
	return {
		姓名: name,
		性别: genderList[Math.floor(rand()*5)],
		分类: `${category.type}${category.emoji}`,
		上围: `${bust.toFixed(1)}cm`,
		下围: `${waist.toFixed(1)}cm`,
		屁围: `${hip.toFixed(1)}cm`,
		罩杯: `${cup}`,
		身高: `${height.toFixed(1)}cm`,
		发色: `${hairColor}`,
		经验人数: `${experiencePeople}`,
		性欲值: `${sexDesire}`,
		性癖: `${hobby}`,
		特殊能力: `${ability}`,
		S度: `${s.toFixed(2)}`,
		M度: `${(100-s).toFixed(2)}`,
		近7日行为: [
			exp7days[0],
			exp7days[1],
			exp7days[2],
			exp7days[3],
			exp7days[4],
			exp7days[5],
			exp7days[6]
		],
		敏感点: sensitivePos,
		淫纹: sexLine,
		高潮率: `${climaxPr}`,
		评价: `${rating.toFixed(1)}`,
	};
}