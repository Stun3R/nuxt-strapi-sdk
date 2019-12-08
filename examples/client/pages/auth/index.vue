<template>
  <div class="h-100">
    <a-row class="h-100" type="flex" justify="space-around" align="middle">
      <a-col :xs="24" :sm="24" :md="12" :lg="8">
        <a-card title="Member Login" class="text-center">
          <a-form :form="form" @submit="handleSubmit" class="text-left">
            <a-form-item>
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your email!'
                      },
                      {
                        type: 'email',
                        message: 'This email is not valid!'
                      }
                    ]
                  }
                ]"
                placeholder="Email"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }
                    ]
                  }
                ]"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                <a-icon
                  slot="suffix"
                  :type="showPassword ? 'eye' : 'eye-invisible'"
                  @click="passwordVisible()"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item class="mb-0">
              <a-button
                :loading="loading"
                :disabled="hasErrors(form.getFieldsError())"
                type="primary"
                block
                html-type="submit"
                class="login-form-button"
              >
                Login
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  name: 'Auth',
  layout: 'guest',
  data() {
    return {
      hasErrors,
      loading: false,
      showPassword: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normalLogin' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$strapi.login(values.email, values.password)
            this.$router.push('/')
            await this.$notification.success({
              placement: 'bottomRight',
              message: 'Successful login',
              description: ''
            })
          } catch (e) {
            // TODO Check Error
          }
        }
      })
    },
    passwordVisible() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped></style>
