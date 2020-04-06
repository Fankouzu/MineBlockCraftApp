export default [
	{
		'inputs': [],
		'stateMutability': 'nonpayable',
		'type': 'constructor',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'oldOwner',
				'type': 'address',
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'newOwner',
				'type': 'address',
			},
		],
		'name': 'OwnerSet',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'fromUser',
				'type': 'address',
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'toUser',
				'type': 'address',
			},
		],
		'name': 'eventAddFriend',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'userAddress',
				'type': 'address',
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'UserId',
				'type': 'uint256',
			},
		],
		'name': 'eventNewUser',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'fromUser',
				'type': 'address',
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'toUser',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'MessageId',
				'type': 'uint256',
			},
		],
		'name': 'newMessage',
		'type': 'event',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address',
			},
		],
		'name': 'AddressToId',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'name': 'IdToAddress',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'name': 'Messages',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': 'time',
				'type': 'uint256',
			},
			{
				'internalType': 'string',
				'name': 'content',
				'type': 'string',
			},
			{
				'internalType': 'address',
				'name': 'fromUser',
				'type': 'address',
			},
			{
				'internalType': 'address',
				'name': 'toUser',
				'type': 'address',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'name': 'Profiles',
		'outputs': [
			{
				'internalType': 'string',
				'name': 'Nickname',
				'type': 'string',
			},
			{
				'internalType': 'string',
				'name': 'Signature',
				'type': 'string',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_toUser',
				'type': 'address',
			},
		],
		'name': 'addFriend',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'newOwner',
				'type': 'address',
			},
		],
		'name': 'changeOwner',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'string',
				'name': '_Nickname',
				'type': 'string',
			},
			{
				'internalType': 'string',
				'name': '_Signature',
				'type': 'string',
			},
		],
		'name': 'editProfile',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [],
		'name': 'getFriends',
		'outputs': [
			{
				'internalType': 'address[]',
				'name': '',
				'type': 'address[]',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_toUser',
				'type': 'address',
			},
		],
		'name': 'getMessages',
		'outputs': [
			{
				'components': [
					{
						'internalType': 'uint256',
						'name': 'time',
						'type': 'uint256',
					},
					{
						'internalType': 'string',
						'name': 'content',
						'type': 'string',
					},
					{
						'internalType': 'address',
						'name': 'fromUser',
						'type': 'address',
					},
					{
						'internalType': 'address',
						'name': 'toUser',
						'type': 'address',
					},
				],
				'internalType': 'struct MBCMessage.Message[]',
				'name': '',
				'type': 'tuple[]',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_address',
				'type': 'address',
			},
		],
		'name': 'getProfile',
		'outputs': [
			{
				'components': [
					{
						'internalType': 'string',
						'name': 'Nickname',
						'type': 'string',
					},
					{
						'internalType': 'string',
						'name': 'Signature',
						'type': 'string',
					},
				],
				'internalType': 'struct MBCUser.Profile',
				'name': '',
				'type': 'tuple',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_toUser',
				'type': 'address',
			},
		],
		'name': 'isFriends',
		'outputs': [
			{
				'internalType': 'bool',
				'name': '',
				'type': 'bool',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address',
			},
			{
				'internalType': 'address',
				'name': '',
				'type': 'address',
			},
		],
		'name': 'messageCount',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [],
		'name': 'msgList',
		'outputs': [
			{
				'internalType': 'address[]',
				'name': '',
				'type': 'address[]',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'string',
				'name': '_Nickname',
				'type': 'string',
			},
			{
				'internalType': 'string',
				'name': '_Signature',
				'type': 'string',
			},
		],
		'name': 'newProfile',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '_userId',
				'type': 'uint256',
			},
		],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'string',
				'name': '_Nickname',
				'type': 'string',
			},
			{
				'internalType': 'string',
				'name': '_Signature',
				'type': 'string',
			},
		],
		'name': 'newUser',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '_userId',
				'type': 'uint256',
			},
		],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [],
		'name': 'owner',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_toUser',
				'type': 'address',
			},
			{
				'internalType': 'string',
				'name': '_content',
				'type': 'string',
			},
		],
		'name': 'sendMsg',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'inputs': [],
		'name': 'userCount',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'stateMutability': 'view',
		'type': 'function',
	},
]
