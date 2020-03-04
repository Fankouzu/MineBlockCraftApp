pragma solidity >=0.4.22 <0.7.0;


contract Owner {

    address public owner;
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() public {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

}

contract MBCUser is Owner {
    struct Profile{
        string Nickname;
        string Signature;
    }

    Profile[] public Profiles;

    mapping(uint => address) public IdToAddress;
    mapping(address => uint) public AddressToId;
    mapping(address => address[]) public Friend;

    uint public userCount;

    event eventNewUser(address indexed userAddress, uint indexed UserId);
    event eventAddFriend(address indexed fromUser, address indexed toUser);

    modifier isUser() {
        require(AddressToId[msg.sender]>0 || msg.sender==owner ,'not registered');
        _;
    }

    constructor() public {
        _newUser("Fankouzu","I'm admin");
    }

    function _newUser(string memory _Nickname,string memory _Signature) private returns(uint _userId){
        Profiles.push(Profile(_Nickname, _Signature));
        uint UserId = Profiles.length - 1;
        IdToAddress[UserId] = msg.sender;
        AddressToId[msg.sender] = UserId;
        userCount++;
        emit eventNewUser(msg.sender,UserId);
        return UserId;
    }

    function newUser(string memory _Nickname,string memory _Signature) public returns(uint _userId){
        require(AddressToId[msg.sender]==0 && msg.sender != owner,'already registered');
        return _newUser(_Nickname,_Signature);
    }

    function editProfile(string memory _Nickname,string memory _Signature) public {
        uint UserId = AddressToId[msg.sender];
        Profiles[UserId] = Profile(_Nickname, _Signature);
    }

    function addFriend(address _toUser)public isUser{
        bool exists = false;
        for (uint i = 0; i < Friend[msg.sender].length; i++) {
            if (Friend[msg.sender][i] == _toUser) {
                exists = true;
            }
        }
        require(!exists,'already is your friend');
        Friend[msg.sender].push(_toUser);
        emit eventAddFriend(msg.sender,_toUser);
    }

    function getFriends() public view returns(address[] memory){
        return Friend[msg.sender];
    }
}




























