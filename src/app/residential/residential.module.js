"use strict";var __decorate=this&&this.__decorate||function(e,o,r,i){var t,l=arguments.length,n=l<3?o:null===i?i=Object.getOwnPropertyDescriptor(o,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,o,r,i);else for(var a=e.length-1;a>=0;a--)(t=e[a])&&(n=(l<3?t(n):l>3?t(o,r,n):t(o,r))||n);return l>3&&n&&Object.defineProperty(o,r,n),n};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),router_1=require("@angular/router"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),md_module_1=require("../md/md.module"),app_module_1=require("../app.module"),dialog_1=require("@angular/material/dialog"),residential_routing_1=require("./residential.routing"),residential_component_1=require("./residential.component"),residential_dialog2_component_1=require("./residential-dialog2/residential-dialog2.component"),ResidentialModule=function(){function e(){}return e=__decorate([core_1.NgModule({imports:[dialog_1.MatDialogModule,common_1.CommonModule,router_1.RouterModule,forms_1.FormsModule,router_1.RouterModule.forChild(residential_routing_1.ResidentialRoutes),md_module_1.MdModule,app_module_1.MaterialModule],declarations:[residential_component_1.DialogOverviewExample,residential_component_1.DialogOverviewExampleDialog,residential_dialog2_component_1.ResidentialDialog2Component],entryComponents:[residential_component_1.DialogOverviewExampleDialog,residential_dialog2_component_1.ResidentialDialog2Component]})],e)}();exports.ResidentialModule=ResidentialModule;