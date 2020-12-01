<template>
  <div class="container">
    <div class="default-section">
      <ejs-richtexteditor
      class="editor"
        ref="rteObj"
        :quickToolbarSettings="quickToolbarSettings"
        :height="300"
        :toolbarSettings="toolbarSettings"
        :placeholder="placeholder"
      >
      </ejs-richtexteditor>
      <button class="btn-save" @click="save()">Save</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  RichTextEditorPlugin,
  Toolbar,
  Image,
  Link,
  HtmlEditor,
  QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor'

Vue.use(RichTextEditorPlugin)

export default {
  data () {
    return {
      placeholder: 'Type Something',
      currentElement: this.$route.query.edit,
      quickToolbarSettings: {
        image: [
          'Replace',
          'Align',
          'Caption',
          'Remove',
          'InsertLink',
          'OpenImageLink',
          '-',
          'EditImageLink',
          'RemoveImageLink',
          'Display',
          'AltText',
          'Dimension'
        ]
      },
      toolbarSettings: {
        items: [
          'Bold',
          'Italic',
          'Underline',
          'StrikeThrough',
          'FontName',
          'FontSize',
          'FontColor',
          'BackgroundColor',
          'LowerCase',
          'UpperCase',
          '|',
          'Formats',
          'Alignments',
          'OrderedList',
          'UnorderedList',
          'Outdent',
          'Indent',
          '|',
          'CreateLink',
          'Image',
          '|',
          'ClearFormat',
          'Print',
          'SourceCode',
          'FullScreen',
          '|',
          'Undo',
          'Redo'
        ]
      }
    }
  },
  provide: {
    richtexteditor: [Toolbar, Image, Link, HtmlEditor, QuickToolbar]
  },
  mounted () {
    if (this.currentElement) {
      const element = this.getListStorage()[
        this.currentElement - 1
      ]
      this.$refs.rteObj.$el.ej2_instances.cloneValue = element
    }
  },
  methods: {
    save (e) {
      // console.log(this.$refs.rteObj.ej2Instances.cloneValue)

      const taskList = this.getListStorage()
      if (this.currentElement) {
        taskList[
          this.currentElement - 1
        ] = this.$refs.rteObj.$el.ej2_instances.cloneValue
      } else {
        taskList.push(this.$refs.rteObj.ej2Instances.cloneValue)
      }
      // console.log(this.$refs.rteObj.$el.ej2_instances[0])
      taskList.push(this.$refs.rteObj.ej2Instances.cloneValue)
      // console.log(this.taskList)
      localStorage.setItem('taskList', JSON.stringify(taskList))
      setTimeout(() => {
        this.$router.push('/list')
      }, 1000)
    },
    getListStorage () {
      let taskList
      if (localStorage.getItem('taskList') === null) {
        taskList = []
      } else {
        taskList = JSON.parse(localStorage.getItem('taskList'))
      }
      return taskList
    }
  }
}
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
