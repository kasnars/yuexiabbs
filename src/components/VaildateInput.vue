<template>
  <div class="validate-input-container pb-3">
    <input  class="form-control"
    v-if="tag !== 'textarea'"
    :class="{'is-invalid':inputRef.error}"
    :value="inputRef.val"
    @blur="vaildateInput"
    @input="updateValue"
    v-bind="$attrs"
    >
    <textarea  class="form-control"
    v-else
    :class="{'is-invalid':inputRef.error}"
    :value="inputRef.val"
    @blur="vaildateInput"
    @input="updateValue"
    v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './VaildateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email' | 'password' | 'name' | 'custom' | 'title';
  message: string;
  myFunc?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TypesProp = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TypesProp>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const vaildateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = (inputRef.val.length >= 6)
              break
            case 'name':
              passed = (inputRef.val.length >= 4)
              break
            case 'title':
              passed = (inputRef.val.length >= 2)
              break
            case 'custom':
              console.log(rule.myFunc)
              passed = rule.myFunc ? rule.myFunc() : true
              console.log(passed)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-created', vaildateInput)
    })
    return {
      inputRef, vaildateInput, updateValue
    }
  }
})
</script>
