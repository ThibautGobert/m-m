<script setup>
import { ref, nextTick } from "vue";
import { DialogComponent as EjsDialog } from "@syncfusion/ej2-vue-popups";
import { ImageEditorComponent as EjsImageeditor } from "@syncfusion/ej2-vue-image-editor";
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";

const props = defineProps({
    toolbarItems: {
        type: Array,
        required: false,
        default() {
            return []
        }
    }
})

console.log(props)

const dialogRef = ref(null);
const imageEditorRef = ref(null);
const dialogVisible = ref(false);

const openDialog = async () => {
    dialogVisible.value = true;
    await nextTick();
    setTimeout(() => {
        if (imageEditorRef.value?.ej2Instances) {
            imageEditorRef.value.ej2Instances.open(
                "https://ej2.syncfusion.com/react/demos/src/image-editor/images/flower.png"
            );
        }
    }, 10);
};

const closeDialog = () => {
    dialogVisible.value = false;
};
</script>

<template>
    <div>
        <ejs-button cssClass="e-img-button" :isPrimary="true" @click="openDialog">Open dialog</ejs-button>
        <ejs-dialog id="profile-dialog" ref="dialogRef" :isModal="true" width="800px" height="fit-content"
                    :visible="dialogVisible" :closeOnEscape="true" @overlayClick="closeDialog">
            <div class="control-section">
                <div id="imageeditor">
                    <ejs-imageeditor ref="imageEditorRef" height="420px" :toolbar="props.toolbarItems"></ejs-imageeditor>
                </div>
            </div>
        </ejs-dialog>
    </div>
</template>

<style scoped>

</style>