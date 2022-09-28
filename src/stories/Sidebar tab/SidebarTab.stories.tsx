import { ComponentMeta, ComponentStory } from '@storybook/react'
import SidebarTab from "./SidebarTab.component";

export default {
    title: 'SidebarTab',
    component: SidebarTab
} as ComponentMeta<typeof SidebarTab>

const Tamplate: ComponentStory<typeof SidebarTab> = args => <SidebarTab {...args} />

export const SimpleTab = Tamplate.bind({});
SimpleTab.args = {
    leave: false,
    icon: 'home',
    dropdown: false,
    label: 'Leaves'
}