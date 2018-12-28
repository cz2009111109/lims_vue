<template>
    <div>
        <Table border :columns="col" :data="row"></Table>
    </div>
</template>
<script>
    export default {
        props: {
            col: Array,
            row: Array
        }
    };
</script>
