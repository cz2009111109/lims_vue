<template>
    <div  >
        //直接在模板中绑定表达式
        <p>{{message.split('').reverse().join('')}}</p>
 
        //运用计算属性
        <p>message反转之后的结果:{{reverseMessage}}</p>

        //运用methods方式
        <p>{{methodMessage()}}</p>

         {{ $t('project.name') }} <br/>

          {{ name }} <br/>
    </div>
</template>
    <script>
export default{
            data(){
                return {
                    message:"hello"
                }
            },
            computed:{
                reverseMessage:function(){
                    return this.message.split('').reverse().join('');
                },
                name:function(){
                    return this.$t('project.name')
                }
            },
            methods:{
                methodMessage:function () {
                    return this.message.split('').reverse().join('');
                }
            }
        }
    </script>