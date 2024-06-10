<template>
  <n-icon :component="iconCompoent" />
</template>

<script lang="ts" setup>
  import { computed, defineAsyncComponent } from 'vue';

  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
  });

  function deletePrefix(name: string) {
    return name.indexOf(':') != -1 ? name.split(':')[1] : name;
  }

  function getPrefix(name: string) {
    return name.indexOf(':') != -1 ? name.split(':')[0] : name;
  }

  const iconCompoent = computed(() => {
    return defineAsyncComponent(async () => {
      const keyName = getPrefix(props.icon);
      if (keyName === '') {
        console.error('Icons are not within the agreed scope');
        return;
      }
      const iconName = deletePrefix(props.icon);
      if (keyName === 'antd') {
        return (await import('@vicons/antd'))[iconName] as any;
      }
      if (keyName === 'ionicons5') {
        return (await import('@vicons/ionicons5'))[iconName] as any;
      }
    });
  });
</script>
