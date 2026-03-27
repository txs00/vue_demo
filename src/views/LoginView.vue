<template>
  <div id="login">
    <el-card>
      <div class="login_title">登 录</div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        :disabled="loading"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
          />
        </el-form-item>
        <el-form-item label=" ">
          <div class="login_button">
            <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "admin",
  password: "123456",
});

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名称", trigger: "blur" },
    { min: 3, max: 8, message: "用户名称长度为3-8个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6-20个字符", trigger: "blur" },
  ],
});
const loading = ref(false);
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        ElMessage.success("登录成功!");
        sessionStorage.setItem("userInfo", JSON.stringify(ruleForm));
        router.push("/home");
      }, 2000);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* animation: gradientBackground 5s infinite; */
  background: linear-gradient(45deg, #f0f0f0, #88d9ff, #88d9ff, #f0f0f0);

  .el-card {
    background: linear-gradient(135deg, #f0f0f0, #88d9ff);
    padding: 20px;
    border-radius: 8px;
    /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
  }
  .login_title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    background: linear-gradient(180deg, #f0f0f0, #88d9ff, #88d9ff, #88d9ff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .login_button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
