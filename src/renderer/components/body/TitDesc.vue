<template>
    <div>
        <template v-for="(d,di) in tds">
            <el-row v-if="d.title" :key="'t'+di">
                <el-col :span="24">
                    <div class="left">{{d.title}}</div>
                </el-col>
            </el-row>
            <el-row v-if="d.divider" :key="'d'+di">
                <el-col :span="tw">
                    <div class="divider"></div>
                </el-col>
            </el-row>
            <el-row v-for="(i,ii) in d.infos" :key="i.k+ii">
                <el-col :span="tw">
                    <div :class="kalign">{{i.k}}</div>
                </el-col>
                <el-col :span="24-tw">
                    <div class="left">{{i.v}}</div>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
    /**
     * exp:
     * [{
     *  title: '',
     *  divider: true / false,
     *  infos:[
     *    {k,v}
     *  ]
     * }]
     */
    export default {
      name: 'titdesc',
      props: {
        tds: Array,
        tw: {
          type: Number,
          default: 4
        },
        kalign: {
          type: String,
          default: 'left'
        }
      }
    }
</script>

<style scoped>
    .right {
        text-align: right;
        padding-right: 3px;
        margin-bottom: 5px;
    }
    .left {
        text-align: left;
        margin-bottom: 5px;
    }
    .divider {
        border-bottom: solid 1px #429c16;
        margin: 5px 0 10px 0;
    }
</style>