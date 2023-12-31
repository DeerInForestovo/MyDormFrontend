<script setup>

</script>

<template>
  <el-dialog width="70vw">
    <template #header>
      <el-text> How to use a <span style="color: red">csv</span> file to generate accounts?</el-text>
    </template>
    <el-text> 1. If you are using excel (i.e. using a xlsx file), save it as a csv file. </el-text> <br><br>
    <el-text> 2. Make sure your file contains three columns: <span style="color: red">'ID', 'name' and 'gender'</span>.</el-text> <br><br>
    <el-text> - 2.1 <span style="color: red">ID</span> is the Student ID of a student. It will also be his/her account.</el-text> <br><br>
    <el-text> - 2.2 <span style="color: red">Name</span> is the name of the student.</el-text> <br><br>
    <el-text> - 2.3 <span style="color: red">Gender</span> should be 'MALE' or 'FEMALE'.</el-text> <br><br>
    <el-text> 3. A <span style="color: red">password</span> column is optional. If there is not such a column, the password will be '123456' for all accounts.</el-text> <br><br>
    <el-text> 4. It does not matter if there are other columns.</el-text> <br><br>
  </el-dialog>
</template>

<style scoped>

</style>