import { FC, useEffect, useState } from 'react'
import { Badge, Checkbox, SidePanel, Input } from '@supabase/ui'
import { PostgresTable } from '@supabase/postgres-meta'
import { SchemaField } from './SchemaEditor.types'
import { useStore } from 'hooks'
import ActionBar from '../ActionBar'

interface Props {
  visible: boolean
  closePanel: () => void
  saveChanges: (
    payload: any,
    resolve: any
  ) => void
}

const SchemaEditor: FC<Props> = ({
  visible = false,
  closePanel = () => {},
  saveChanges = () => {},
}) => {
  const { ui } = useStore()

  const [errors, setErrors] = useState<any>({})
  const [schemaFields, setSchemaFields] = useState<SchemaField>()

  useEffect(() => {
    if (visible) {
      setErrors({})
    }
  }, [visible])

  const onUpdateField = (changes: Partial<SchemaField>) => {
    const updatedTableFields = { ...schemaFields, ...changes } as SchemaField
    setSchemaFields(updatedTableFields)

    const updatedErrors = { ...errors }
    for (const key of Object.keys(changes)) {
      delete updatedErrors[key]
    }
    setErrors(updatedErrors)
  }

  const onSaveChanges = (resolve: any) => {
    if (schemaFields && schemaFields.name) {
      const payload = {
        name: schemaFields.name
      };

      saveChanges(payload, resolve)
    }
  }

  return (
    <SidePanel
      size="large"
      key="SchemaEditor"
      visible={visible}
      // @ts-ignore
      header="Create a new schema"
      className="transition-all ease-in duration-100"
      onCancel={closePanel}
      onConfirm={() => (resolve: () => void) => onSaveChanges(resolve)}
      customFooter={
        <ActionBar
          backButtonLabel="Cancel"
          applyButtonLabel="Save"
          closePanel={closePanel}
          applyFunction={(resolve: () => void) => onSaveChanges(resolve)}
        />
      }
    >
      <>
        <SidePanel.Content>
          <div className="space-y-10 py-6">
            <Input
              label="Name"
              layout="horizontal"
              type="text"
              error={errors.name}
              value={schemaFields?.name}
              onChange={(event: any) => onUpdateField({ name: event.target.value })}
            />
          </div>
        </SidePanel.Content>
      </>
    </SidePanel>
  )
}

export default SchemaEditor
