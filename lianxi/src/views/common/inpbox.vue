<template>
    <div class="inpbox">
        <span class="qh_text" v-if="inptext">{{inptext}}{{inptext=="未归天数"?">=":": "}}</span>
        <div :class="inptext?'sbox':''||inpb?'sbox':''"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props:{
        inptext:String,
        inpb:Boolean
    }
}
</script>
