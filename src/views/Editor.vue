<template>
  <div class="container">
    <div class="default-section">
      <ejs-richtexteditor
      class="editor"
        ref="rteObj"
        :value="element"
        :quickToolbarSettings="quickToolbarSettings"
        :height="340"
        :toolbarSettings="toolbarSettings"
        :placeholder="placeholder"
        :imageUploading="onImageUploading"
        @keyup.enter="save($event)"
      >
      </ejs-richtexteditor>
      <button class="btn-save" @click="save($event)">Save</button>
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
      element: '',
      // taskList: [],
      placeholder: 'Type Something',
      currentElement: this.$route.query.edit,
      height: 400,
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
      console.log(e.target.innerHTML)
      console.log(this.element)

      console.log(this.$refs.rteObj.$el.ej2_instances.getContent)
      console.log(this.$refs.rteObj.ej2Instances.cloneValue.value)

      const taskList = this.getListStorage()
      if (this.currentElement) {
        taskList[
          this.currentElement - 1
        ] = this.$refs.rteObj.$el.ej2_instances.cloneValue
      } else {
        taskList.push(this.$refs.rteObj.ej2Instances.cloneValue)
      }
      // console.log(this.$refs.rteObj.$el.ej2_instances[0])
      var instance = this.$refs.rteObj.$el.ej2_instances[0]
      instance.contentModule
        .getDocument()
      // console.log(this.$refs.rteObj.ej2Instances)
      taskList.push(this.$refs.rteObj.ej2Instances.cloneValue)
      // console.log(this.taskList)
      localStorage.setItem('taskList', JSON.stringify(taskList))
      setTimeout(() => {
        this.$router.push('/list')
      }, 1000)
    },
    onImageUploading: function (args) {
      console.log('file is uploading')
      var imgSize = 200000
      var sizeInBytes = args.fileData.size
      if (imgSize < sizeInBytes) {
        args.cancel = true
      }
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
