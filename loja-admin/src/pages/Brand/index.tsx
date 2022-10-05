import { ColumnActionsMode, IColumn, Panel, PanelType, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { IBrand } from "@typesCustom";
import { useEffect, useState } from "react";
import { MessageBarCustom } from "../../components/MessageBarCustom";
import { PageToolBar } from "../../components/PageToolBar";
import { listBrands } from "../../services/server";


export function BrandPage() {

    // State - Entities
    const [brand, setBrand] = useState<IBrand>({} as IBrand)
    const [brands, setBrands] = useState<IBrand[]>([])

    // State - Messages
    const [messageError, setMessageError] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')

    // State - Loading
    const [loading, setLoading] = useState(true);

    // State - Open and Close Panel
    const [openPanel, setOpenPanel] = useState(false);

    // Colunas
    const colums: IColumn [] = [
        {
            key: 'name',
            name: 'Nome da Marca',
            fieldName: 'name',
            minWidth: 100,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled
        }
    ]

    useEffect(() => {

        listBrands()
            .then(result => {
                setBrands(result.data)
            })
            .catch(error => {
                setMessageError(error.message)
                setInterval(() => {handleDismissMessageBar}, 10)
            })
            .finally(() => setLoading(false))

    }, [])

    function handleNew() {
        setBrand({name: ''})
        setOpenPanel(true)
    }

    // Dismiss error bar
    function handleDismissMessageBar() {
        setMessageError('')
        setMessageSuccess('')
    }


    return (
        <div id="brand-page" className="main-content">
            <h1>Brand Page</h1>

            <Stack horizontal={false}>
                <PageToolBar currentPageTitle="Marcas" loading={loading} onNew={handleNew}/>

                <MessageBarCustom messageError={messageError} messageSuccess={messageSuccess} onDismiss={handleDismissMessageBar}/>

                <div className="data-list">
                    <ShimmeredDetailsList items={brands} columns={colums} setKey="set" enableShimmer={loading} selectionMode={SelectionMode.none}/>
                </div>
                
            </Stack>

            <Panel className="panel-form" isOpen={openPanel} type={PanelType.medium} headerText="Cadastro de Marca" isFooterAtBottom={true} onDismiss={() => {setOpenPanel(false)}}>
                
                <p>Preencha todos os campos obrigatorios identificados por <span className="required">*</span></p>

                <Stack horizontal={false} className="panel-form-content">
                    <TextField label="Nome da Marca" required value={brand.name} 
                    onChange={event => setBrand({...brand, name: (event.target as HTMLInputElement).value})}/>
                </Stack>

            </Panel>
        </div>
    )
}