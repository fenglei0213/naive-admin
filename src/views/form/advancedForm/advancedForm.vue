<template>
  <PageWrapper>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="高级表单">
        当一次性提交大量数据时，可使用高级表单，根据自身情况选择是否使用 BasicForm
        组件，以下布局支持自适应
        <p>多语言（单页面）演示: {{ t('hello') }}</p>
      </n-card>
    </div>
    <n-form
      ref="formRef"
      :label-width="100"
      :model="formValue"
      :rules="rules"
      label-placement="left"
    >
      <n-card
        :bordered="false"
        class="mt-3 proCard"
        title="预约信息"
        size="small"
        :segmented="{
          content: true,
        }"
        content-style="padding: 20px 20px 0 0;"
      >
        <n-grid cols="1 s:1 m:2 l:3 xl:4 2xl:4" responsive="screen">
          <n-grid-item>
            <n-form-item label="预约姓名" path="name">
              <n-input v-model:value="formValue.name" placeholder="输入姓名" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约号码" path="mobile">
              <n-input v-model:value="formValue.mobile" placeholder="电话号码" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约时间" path="datetime">
              <n-date-picker class="w-full" v-model:value="formValue.datetime" type="datetime" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约医生" path="doctor">
              <n-select
                v-model:value="formValue.doctor"
                :options="doctorList"
                placeholder="请选择预约医生"
              />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约事项" path="matter">
              <n-select
                v-model:value="formValue.matter"
                :options="matterList"
                multiple
                placeholder="请选择预约事项"
              />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约备注" path="remark">
              <n-input v-model:value="formValue.remark" placeholder="请输入预约备注" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="预约备注" path="remark">
              <n-input v-model:value="formValue.remark" placeholder="请输入预约备注" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="出生日期" path="dateBirth">
              <n-date-picker class="w-full" v-model:value="formValue.dateBirth" type="datetime" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="性别" path="sex">
              <n-radio-group v-model:value="formValue.sex" name="sex">
                <n-space>
                  <n-radio :value="1">男</n-radio>
                  <n-radio :value="2">女</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </n-grid-item>

          <!--            <div style="margin-left: 80px">-->
          <!--              <n-space>-->
          <!--                <n-button type="primary" @click="formSubmit">提交预约</n-button>-->
          <!--                <n-button @click="resetForm">重置</n-button>-->
          <!--              </n-space>-->
          <!--            </div>-->
        </n-grid>
      </n-card>

      <n-card
        :bordered="false"
        class="mt-3 proCard"
        title="就诊信息"
        size="small"
        :segmented="{
          content: true,
        }"
        content-style="padding: 20px 20px 0 0;"
      >
        <n-grid cols="1 s:1 m:2 l:3 xl:4 2xl:4" responsive="screen">
          <n-grid-item>
            <n-form-item label="过敏史" path="allergiChistory">
              <n-input v-model:value="formValue.allergiChistory" placeholder="请输入过敏史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="既往史" path="pastHistory">
              <n-input v-model:value="formValue.pastHistory" placeholder="请输入既往史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="传染史" path="contagion">
              <n-input v-model:value="formValue.contagion" placeholder="请输入传染史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="身份证号" path="idNo">
              <n-input v-model:value="formValue.idNo" placeholder="请输入身份证号" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="介绍人" path="introducer">
              <n-input v-model:value="formValue.introducer" placeholder="请输入介绍人" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="就诊医生" path="seeDoctor">
              <n-select
                v-model:value="formValue.seeDoctor"
                :options="doctorList"
                placeholder="请选择就诊医生"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="初诊日期" path="firstDatetime">
              <n-date-picker
                class="w-full"
                v-model:value="formValue.firstDatetime"
                type="datetime"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="近次复诊" path="subsequent">
              <n-date-picker class="w-full" v-model:value="formValue.subsequent" type="datetime" />
            </n-form-item>
          </n-grid-item>
          <!--          <n-grid-item>-->
          <!--            <n-form-item label="图片" path="img">-->
          <!--              <BasicUpload-->
          <!--                v-model:value="uploadList"-->
          <!--                :action="`${uploadUrl}/v1.0/files`"-->
          <!--                :data="{ type: 0 }"-->
          <!--                :headers="uploadHeaders"-->
          <!--                :height="100"-->
          <!--                :width="100"-->
          <!--                helpText="单个文件不超过20MB，最多只能上传10个文件"-->
          <!--                name="files"-->
          <!--                @uploadChange="uploadChange"-->
          <!--              />-->
          <!--            </n-form-item>-->
          <!--          </n-grid-item>-->
        </n-grid>
      </n-card>

      <n-card
        :bordered="false"
        class="mt-3 proCard"
        title="就诊信息"
        size="small"
        :segmented="{
          content: true,
        }"
        content-style="padding: 20px 20px 0 0;"
      >
        <n-grid cols="1 s:1 m:2 l:3 xl:4 2xl:4" responsive="screen">
          <n-grid-item>
            <n-form-item label="过敏史" path="allergiChistory">
              <n-input v-model:value="formValue.allergiChistory" placeholder="请输入过敏史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="既往史" path="pastHistory">
              <n-input v-model:value="formValue.pastHistory" placeholder="请输入既往史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="传染史" path="contagion">
              <n-input v-model:value="formValue.contagion" placeholder="请输入传染史" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="身份证号" path="idNo">
              <n-input v-model:value="formValue.idNo" placeholder="请输入身份证号" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="介绍人" path="introducer">
              <n-input v-model:value="formValue.introducer" placeholder="请输入介绍人" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="就诊医生" path="seeDoctor">
              <n-select
                v-model:value="formValue.seeDoctor"
                :options="doctorList"
                placeholder="请选择就诊医生"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="初诊日期" path="firstDatetime">
              <n-date-picker
                class="w-full"
                v-model:value="formValue.firstDatetime"
                type="datetime"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="近次复诊" path="subsequent">
              <n-date-picker class="w-full" v-model:value="formValue.subsequent" type="datetime" />
            </n-form-item>
          </n-grid-item>
          <!--          <n-grid-item>-->
          <!--            <n-form-item label="图片" path="img">-->
          <!--              <BasicUpload-->
          <!--                v-model:value="uploadList"-->
          <!--                :action="`${uploadUrl}/v1.0/files`"-->
          <!--                :data="{ type: 0 }"-->
          <!--                :headers="uploadHeaders"-->
          <!--                :height="100"-->
          <!--                :width="100"-->
          <!--                helpText="单个文件不超过20MB，最多只能上传10个文件"-->
          <!--                name="files"-->
          <!--                @uploadChange="uploadChange"-->
          <!--              />-->
          <!--            </n-form-item>-->
          <!--          </n-grid-item>-->
        </n-grid>
      </n-card>
    </n-form>
    <template #rightFooter>
      <n-space>
        <n-button @click="resetForm">重置</n-button>
        <n-button type="primary" @click="formSubmit">提交</n-button>
      </n-space>
    </template>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from 'naive-ui';
  import { FormRules } from 'naive-ui';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n({
    messages: {
      zh_CN: {
        hello: 'Hi，你好!',
      },
      en: {
        hello: 'hello world!',
      },
    },
  });

  const matterList = [
    {
      label: '种牙',
      value: 1,
    },
    {
      label: '补牙',
      value: 2,
    },
    {
      label: '根管',
      value: 3,
    },
  ];

  const doctorList = [
    {
      label: '李医生',
      value: 1,
    },
    {
      label: '黄医生',
      value: 2,
    },
    {
      label: '张医生',
      value: 3,
    },
  ];

  const rules: FormRules = {
    name: {
      required: true,
      message: '请输入预约姓名',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: '请输入预约备注',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: '请输入预约电话号码',
      trigger: ['input'],
    },
    datetime: {
      required: true,
      type: 'number',
      message: '请选择预约时间',
      trigger: ['blur', 'change'],
    },
    seeDoctor: {
      required: true,
      type: 'number',
      message: '请选择就诊时间',
      trigger: ['blur', 'change'],
    },
    firstDatetime: {
      required: true,
      type: 'number',
      message: '请选择初诊时间',
      trigger: ['blur', 'change'],
    },
    doctor: {
      required: true,
      type: 'number',
      message: '请选择预约医生',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();

  const defaultValueRef = () => ({
    name: '',
    mobile: '',
    remark: '',
    sex: 1,
    matter: null,
    doctor: null,
    datetime: [],
  });

  let formValue: any = reactive(defaultValueRef());

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('验证成功');
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }

  function resetForm() {
    formRef.value.resetFields();
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }
</script>
