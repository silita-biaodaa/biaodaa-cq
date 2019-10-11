<template>
	<div class="paging">
		<ul>
			<li class="borderNone">当前第<span>{{current}}/{{allNum}}页</span></li>
			<li @click="btnClick(1)">首页</li>
			<li class="btn " @click="jumpUp">上一页</li>
			<li v-for="(o,i) in indexsList" :class="{'active': current== o}" @click="next(o)" :key="i">{{o}}</li>
			<li class="borderNone" v-if="ellEnd">&hellip;</li>
			<li class="btn " @click="jumpD">下一页</li>
			<li @click="btnlast">尾页</li>
			<li class="borderNone put-p ">
				到
				<input v-model="num" class="put-jump">
				页
			</li>
			<li @click="jump">跳转</li>

		</ul>

	</div>
</template>
<script>
	export default {
		name: 'paging', // 结构名称
		data() {
			return {
				// 数据模型
				current: 1, //当前页码
				// num:'',
				ellEnd: false,
				ellStart: false,
				total: 0,
				num: null,
				newc: this.currents
			}
		},
		watch: {
			// 监控集合
			currents(val) {
				if (val == 1) {
					this.current = 1
				} else if (val == 0) {
					this.current = 1
				}
			}
		},
		props: {
			'currents': {
				type: Number,
				default: 1
			},
			'all': { //总条数
				type: Number,
				default: 1
			},
			'pageSize': {
				type: Number,
				default: 20
			},
		},
		// updated () {
		//   console.log('子：'+this.$parent.present)  
		// },
		mounted() {
			// console.group('挂载结束状态===============》mounted');
			this.current = this.currents
			this.$nextTick(function() {
				// console.log('执行完后，执行===============》mounted');
			});
		},
		methods: {
			// 方法 集合
			btnClick: function(data) { //页码点击事件
				if (this.current == 1) {
					return
				}
				this.current = data
				this.$emit('skip', {
					cur: data
				});
			},
			btnlast(data) {
				if (this.current == this.total) {
					return
				}
				this.$emit('skip', {
					cur: this.allNum
				});
				this.current = this.allNum;
			},
			next(val) {
				if (this.current == val) {
					return
				}

				this.current = val
				this.$emit('skip', {
					cur: val
				});
			},
			jump() { //跳转
				if (this.num != ''  && this.num >= 1 && this.num <= this.total) {
					this.current = (this.num) * 1;
					this.$emit('skip', {
						cur: this.current
					});
				} else {
					this.num = ''
				}
			},
			// 需要改进
			jumpFn(str) { //上一页，下一页
				if (this.current == 1 || this.current == this.total) {
					return
				}
				switch (str) {
					case 'up':
						this.current--;
						break;
					case 'down':
						this.current++;
						break;
				}
				this.$emit('skip', {
					cur: this.current
				});
			},
			jumpUp() {
				if (this.current == 1) {
					return
				}
				this.current--;
				this.$emit('skip', {
					cur: this.current
				});
			},
			jumpD() {
				if (this.current == this.total) {
					return
				}
				this.current++;
				this.$emit('skip', {
					cur: this.current
				});
			}
		},
		computed: {
			allNum() { //  当前总页数
				this.total = Math.ceil(this.all / this.pageSize)
				return Math.ceil(this.all / this.pageSize) == 0 ? 1 : Math.ceil(this.all / this.pageSize)
			},
			newcc: function() {
				return this.currents
			},
			// show(){
			// 	if(this.all>=this.pageSize){
			// 		return true
			// 	}else{
			// 		return false
			// 	}
			// },
			indexsList: function() {
				let arr = [], // 指向indexsLiist 渲染数组 
					min = 1, // 第一页 
					max = this.allNum; // 当前总页数
				if (this.allNum > 5) {
					this.ellEnd = true;
					// this.ellStart=false;
					max = 4;
					if (this.current > 3) {
						// 有待改进
						min = this.current - 2;
						max = this.current + 2;
						if (max >= this.allNum - 1) {
							this.ellEnd = false
							max = this.allNum
							min = this.allNum - 3
						}
						// if(this.current>=3){
						// 	this.ellStart=true;
						// }
					}
				} else {
					this.ellEnd = false;
				}
				while (min <= max) {
					arr.push(min)
					min++
				}
				return arr
			},

		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang="less" scoped>
	.paging {
		text-align: center;
		margin:40px 0;
		ul {
			li {
				padding: 0 14px;
				height: 40px;
				line-height: 40px;
				color: @color;
				border: 1px solid @color;
				border-radius: 5px;
				margin-right: 10px;
				font-size: 14px;
				display: inline-block;
				cursor: pointer;

			}

			.btn {
				padding: 0 10px;
			}

			.borderNone {
				border: none;
				color: #666666;
				font-size: 16px;

				span {
					color: @color;
				}
			}

			li:last-child {
				margin-right: 0;
			}

			li.active {
				border: none;
				background: @color;
				color: #fff;
			}

			.put-jump {
				border: 1px solid @color;
				height: 40px;
				line-height: 40px;
				outline: none;
				width: 40px;
				border-radius: 5px;
				padding-left: 10px;
				box-sizing: border-box;
				color: @color;
			}

			.put-p {
				padding: 0 5px;
			}
		}
	}



	.btn.ban-click {
		cursor: not-allowed;
		opacity: .5;
	}
</style>
